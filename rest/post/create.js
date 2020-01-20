const mogoose = require('mongoose');
const POST = require('../../mongo/shema/post');
const Post = mogoose.model('POST',POST.schema);

module.exports=  async (req,res)=>{
  const {title,subjects,writer,body,comment }
    = req.body;
  const {error}=POST.validate(req.body);
  if(error){
    res.status(400).send({...error});
    return;
  }
  const post = new Post({
    title, 
    subjects,
    writer,
    body,
    comment,
  })
    try {
      await post.save();
       res.status(200).send({success:true});
    }catch(e){
      res.status(500).send({success:false,...e});
    }
}

  