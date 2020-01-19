const mogoose = require('mongoose');
const POST = require('../../mongo/shema/post');
const Post = mogoose.model('POST',POST.schema);

const multer = require('multer');

const myMulter= multer({
    dest:'public/img', 
    limits:{fileSize:10*1024*1024},
})

async function  imageUploader(req, res){
//  const imges= req.files.map( ({path})=>path );
  //console.log(imges);
  const {filename} = req.file;
  res.status(200).send({   path:`/img/${filename}`})
}

module.exports = {
     myMulter:myMulter,
     imageUploader:imageUploader
}