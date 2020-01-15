const mogoose = require('mongoose');
const {Schema}=mogoose;

const COMMENT = new Schema();

COMMENT.add({
  writer:{type:String ,default:'kyb'},
  body:{type:String},
  time:{type: Date, default: Date.now},
})

module.exports= COMMENT;
