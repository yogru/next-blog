const mongoose = require('mongoose');
const SUBJECT = require('../../mongo/shema/subject');
const Subject=  mongoose.model('SUBJECT', SUBJECT.schema);

module.exports = async (req, res) => {
  const { name ,parentSubject }= req.body;
  const { error } = SUBJECT.validate({name});
  if (error) {
    res.status(404).send({success:false,message:'post value validate fail'});
    return;
  }
   await Subject.create({name,parentSubject},(err,doc)=>{
       if(err){
           res.status(500).send({ success: false, Error: err});
        return;
       }
       res.status(200).send({ success: true , id: doc._id});
   })

}

