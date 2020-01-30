const mogoose = require('mongoose');
const Joi = require('joi');
const {getJoiValidate} = require('../utils');
const subject = new mogoose.Schema();
Joi.objectId =require('joi-objectid')(Joi);

subject.add({
    name:{type:String,required:true},
    parentSubject:{type:String,default:'null'}
})
subject.index({parentSubject:1,name:1},{unique: true});

const joiObjectKeys={
  name:Joi.string().required(),
  parentSubject:Joi.objectId(),
}

const joiSchema= Joi.object().keys(joiObjectKeys)

module.exports={
  schema:subject,
  joiSchema,
  validate:getJoiValidate(joiSchema),
  joiObjectKeys,
}
