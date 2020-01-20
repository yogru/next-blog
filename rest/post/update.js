const mogoose = require('mongoose');
const POST = require('../../mongo/shema/post');
const Post = mogoose.model('POST',POST.schema);

exports.updateById =  async (req,res)=>{
    const {id}= req.params;
    try {
     const post= await Post.findByIdAndUpdate(id,{...req.body},{new:true}).exec();
     if(!post){
        res.status(404).send({success:false});
        return;
     }
     res.status(200).send({success:true,...post});
    }catch(e){
      res.status(500).send({success:true,...e});
    }
  }
  