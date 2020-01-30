const mongoose = require('mongoose');
const POST = require('../../mongo/shema/post');
const Post = mongoose.model('POST',POST.schema);

//함수 조합해서 쓰자. 
//지금은 일단 구현에 치중..
exports.getTitleBySubjectID=   async (req,res)=>{
  const {subjectID} =  req.params; 
  try {
    const titles = 
      await Post.find({"subjectID":{ $eq:subjectID } },{"title": true})
      res.status(200).send({...titles});
  }catch(err){
    res.status(500).send({});
  }
}

exports.readById = async (req,res)=>{
  const {id} =  req.params;
  const {ObjectId } =  mongoose.Types;
  console.log(ObjectId)
  try {
    const post = await Post.findById(new ObjectId(id)).exec();
    if(post === null) {
      throw new Error('not find post');
    }
    res.status(200).send({post});  
  }catch(e){
    res.status(500).send({error:e.message});  
  }
}
