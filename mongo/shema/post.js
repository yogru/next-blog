const mongoose = require('mongoose');
const COMMENT = require('./comment');
const Joi = require('joi');
const POST = new mongoose.Schema();
const {getJoiValidate} = require('../utils');
Joi.objectId =require('joi-objectid')(Joi);

POST.add({
  title:{type:String ,required:true},
  subjectID:{type:mongoose.ObjectId,required:true},
  time:{type: Date, default: Date.now},
  writer:{type:String ,default:'kyb'},
  body:{type:String ,default:''},
  imgesSrc:[String],
  comment:[COMMENT.schema],
})

POST.index({subjectID:-1,title:-1 },{unique: true});

const joiObjectKeys = {
  title:Joi.string().required(),
  subjectID:Joi.objectId(),
  // writer:Joi.string(),
  // body:Joi.string().required(),
  // imgesSrc:Joi.array().items(Joi.string()),
  // comment:Joi.array().items(COMMENT.joiObjectKeys),
}

const joiSchema= Joi.object().keys(joiObjectKeys);

module.exports= {
  schema:POST,
  joiSchema,
  validate:getJoiValidate(joiSchema),
  joiObjectKeys,
}
