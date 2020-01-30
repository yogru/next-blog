// const mogoose = require('mongoose');
// const POST = require('../../mongo/shema/post');
// const Post = mogoose.model('POST',POST.schema);

// module.exports= async (req,res)=>{
//   const page = parseInt(req.query.page || '1', 10);
//   const limit = parseInt(req.query.limit || '10', 10);
//   if(page<1 || limit<1){
//     res.status(404).send({success:false});
//     return;
//   }

//   try{
//    const posts = await Post.find().
//                  limit(limit).skip((page-1)* limit).exec();
//    const postCount = await Post.countDocuments().exec();
//    const pageSumCount= Math.ceil(postCount/limit);
//     res.status(200).send({success:true,pageSumCount,...posts});
//   }catch(e){
//     res.status(500).send({success:false , ...e});
//   }
// }
