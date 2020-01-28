const mongoose = require('mongoose');
const SUBJECT = require('../../mongo/shema/subject');
const Subject=  mongoose.model('SUBJECT', SUBJECT.schema);

module.exports = async (req, res) => {
  const {  name }= req.body;
  const { error } = SUBJECT.validate({name});

  if (error) {
    res.status(404).send({success:false,message:'post value validate fail'});
    return;
  }
  const find= await Subject.findOne({
     "name":{$all:name,$size:name.length}
  });

  if(!find){
    await Subject.create({ name }, (err,doc) => {
      if (err) {
        res.status(500).send({ success: false, Error: err});
        return;
      }
      res.status(200).send({ success: true , id: doc._id});
    });
    return;
  }
  res.status(200).send({success: true ,message:'이미 존재 하는 주제',id: find._id}); 
}

