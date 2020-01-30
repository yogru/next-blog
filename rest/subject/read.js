const mongoose = require('mongoose');
const SUBJECT = require('../../mongo/shema/subject')
const Subject = mongoose.model('SUBJECT', SUBJECT.schema);

exports.subjectsByPID = async (req, res) => {
    const { parentSubject } = req.params;
    console.log('pID:',parentSubject, req.params);
    await Subject.find({"parentSubject":{$eq:parentSubject}},(err,doc)=>{
         if(err){
            res.status(500).send({err}); 
            return;
         }
         res.status(200).send([...doc]);
    })
}

exports.readByID = async (req, res) => {
   const {id}=  req.params; 
   await Subject.findById(id,(err,doc)=>{
        if(err){
            res.status(500).send({});
            return;
        }
        res.status(200).send({ subject:doc });
   });
}

