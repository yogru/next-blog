const mogoose = require('mongoose');
const POST = require('../../mongo/shema/post');
const Post = mogoose.model('POST',POST.schema);

exports.removeById=  async (req,res)=>{
    const {id}= req.params;
    try {
      await Post.findByIdAndRemove(id).exec();
      res.status(200).send({success:true});
    }catch(e){
      res.status(500).send({success:false,...e});
    }
}