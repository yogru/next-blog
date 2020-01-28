const mogoose = require('mongoose');
const Joi = require('joi');
const {getJoiValidate} = require('../utils');
const subject = new mogoose.Schema();

subject.add({
    name:{type:[String],required:true,index: true},
})
const joiObjectKeys={
  name:Joi.array().items(Joi.string()).required(),
}
const joiSchema= Joi.object().keys(joiObjectKeys)

module.exports={
  schema:subject,
  joiSchema,
  validate:getJoiValidate(joiSchema),
  joiObjectKeys,
}
