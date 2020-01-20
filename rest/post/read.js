const mogoose = require('mongoose');
const POST = require('../../mongo/shema/post');
const Post = mogoose.model('POST',POST.schema);
//함수 조합해서 쓰자. 
//지금은 일단 구현에 치중..

exports.readSubjects =  async (req,res)=>{
  try {
   const post = await Post.find({},{subjects:1}).exec();
    res.status(200).send({success:true,subjects:post});
  }catch(e){
    res.status(500).send({success:false});
  }
}

exports.readPostBySubject=  async (req,res)=>{
  const {subject}= req.params;
  let posts = undefined;
  try {
     posts= await Post.
       find({"subjects": {$eq:subject,$exists:true,$not:{$size: 0} } }).exec();
    if(posts.length === 0){
       throw new Error('no-date');
    }
    res.status(200).send({success:true,posts});  
  }catch(e){
    let stateCode = 500;
    if(posts)stateCode=404;
     res.status(stateCode).send({success:false,...e});
  }
}