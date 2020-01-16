const mogoose = require('mongoose');
const Joi = require('joi');
const {getJoiValidate} = require('../utils');
const COMMENT = new mogoose.Schema();

COMMENT.add({
  writer:{ type:String },
  body:{type:String},
  time:{type: Date, default: Date.now},
})

const joiObjectKeys={
  writer:Joi.string().required(),
  body:Joi.string().required(),
  time:Joi.date(),
}
const joiSchema= Joi.object().keys(joiObjectKeys)

module.exports={
  schema:COMMENT,
  joiSchema,
  validate:getJoiValidate(joiSchema),
  joiObjectKeys,
}
