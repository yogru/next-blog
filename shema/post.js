const mogoose = require('mongoose');
const COMMENT = require('./comment');
const {Schema}= mogoose;

const POST = new Schema();

POST.add({
  title:{type:String ,required:true },
  subjects:[String],
  time:{type: Date, default: Date.now},
  writer:{type:String ,default:'kyb'},
  body:{type:String},
  comment:[COMMENT],
})

module.exports= POST;
