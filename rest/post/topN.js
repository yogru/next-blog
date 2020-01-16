const mogoose = require('mongoose');
const POST = require('../../mongo/shema/post');
const Post = mogoose.model('POST',POST.schema);

module.exports=async (req,res)=>{
    const sort = req.query.sort || 'desc';
    const count=  parseInt(req.query.count || '3', 10);
      
     if( (sort !=='desc'&& sort!=='asc' ) || count< 1){
       res.status(404).send({success:false});
       return;
     }
     const idSort= (sort=== 'desc'? -1:1);
     try{
         const posts= await Post.find().
                      sort({_id:idSort}).limit(count).exec();

       res.status(200).send({success:true,...posts});
     }catch(e){
       res.status(500).send({success:false , ...e});
     }
}