const express = require('express');
const next = require('next');
const lruCache = require('lru-cache');
const dotenv = require('dotenv');
const url = require('url');
const mongoose= require('mongoose');
const bodyParser = require('body-parser')

dotenv.config();

 const ssrCache = new lruCache({
    max:100,
    maxAge:1000 *60,
});

const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev,
  });

const handle = app.getRequestHandler();

async function renderLRU(req, res){
    const parseURL =  url.parse(req.url,true);
    const key = parseURL.path;
    if(ssrCache.has(key)){
        console.log('cache...');
        res.send(ssrCache.get(key));
        return;
    }
    try {
               const {query , pathname} = parseURL;
               const html = await app.renderToHTML(req,res,pathname,query);
          if(res.statusCode === 200)ssrCache.set(key,html);
          res.send(html);
    }catch(err){
       app.renderError(err,req,res,pathname,query);
    }
}

app.prepare().then( ()=>{
    const server = express();

    server.use(express.static('out'));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use('/post',require('./rest/post'));

    server.get('/' ,  (req, res)=>{
        res.redirect('/home');
    })
    server.get('/home' ,  (req, res)=>{
         return renderLRU(req,res);
    })
     server.get('*' ,  (req, res)=>{
         return handle(req,res);
     })
     server.listen(process.env.PORT , err =>{
         if(err) throw err;
         console.log(`>> listen Ready on PORT:${process.env.PORT}`)
     });

    mongoose.connect(process.env.MONGO_URI ,{useNewUrlParser: true, useUnifiedTopology: true}).
    then(()=>{console.log('connect MONGO')}).catch(e=>{console.log('mongo error: ',e)});

})
