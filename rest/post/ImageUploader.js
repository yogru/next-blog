const mogoose = require('mongoose');
const POST = require('../../mongo/shema/post');
const multer = require('multer');

const Post = mogoose.model('POST',POST.schema);

const myMulter= multer({
    dest:'public/img', 
    limits:{fileSize:10*1024*1024},
})

async function  imageUploader(req, res){
  // const imges= req.files.map( ({path})=>path );
  //console.log(imges);
  /* 디비에 등록하는 부분 있어야됨.
   최종 등록시 비교해야됨. 그리구 필요없는거 삭제 */
  const {filename} = req.file;
  res.status(200).send({   path:`/img/${filename}`})
}

module.exports = {
     myMulter:myMulter,
     imageUploader:imageUploader
}