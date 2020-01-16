const mongoose = require('mongoose');
const Joi = require('joi');

exports.middleWareValidObjectID= (req, res,next)=>{
 const {ObjectId} = mongoose.Types;
 const {id}= req.params
   if(!ObjectId.isValid(id)){
     res.status(400).json({success:false, message:"id 찾을 수 없습니다."});
     return;
   }
   next();
}

exports.getJoiValidate=(joiSchema)=>{
  return function validate(target){
    return Joi.validate(target,joiSchema);
  }
}
