const post = {
  title:{type:String , unique: true},
  subject:[{type:String ,required:true }],
  content:{type:String ,default:"" },
  time:{type: Date, default: Date.now},
}

module.exports= post;
