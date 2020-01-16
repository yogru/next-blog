const mogoose = require('mongoose');
const COMMENT = require('./comment');
const Joi = require('joi');
const POST = new mogoose.Schema();
const {getJoiValidate} = require('../utils')
 
POST.add({
  title:{type:String ,required:true },
  subjects:[String],
  time:{type: Date, default: Date.now},
  writer:{type:String ,default:'kyb'},
  body:{type:String},
  comment:[COMMENT.schema],
})

const joiObjectKeys = {
  title:Joi.string().required(),
  writer:Joi.string(),
  subjects:Joi.array().items(Joi.string()).required(),
  body:Joi.string().required(),
  comment:Joi.array().items(COMMENT.joiObjectKeys),
}
const joiSchema= Joi.object().keys(joiObjectKeys);

module.exports= {
  schema:POST,
  joiSchema,
  validate:getJoiValidate(joiSchema),
  joiObjectKeys,
}
