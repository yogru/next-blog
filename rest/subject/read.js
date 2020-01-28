const mongoose = require('mongoose');
const SUBJECT = require('../../mongo/shema/subject')

const Subject = mongoose.model('SUBJECT', SUBJECT.schema);

const makeStructObject= (acc, subj) => {
    const { _id, name } = subj;
    if(!acc[name[0]])acc[name[0]]={name: name[0], subList:{}} 
    let prev = acc[name[0]];
    let cursor = acc[name[0]].subList;
    name.shift();
    name.map((minSubj) => {
        if(!cursor[minSubj]){
            cursor[minSubj] = {  
                name: minSubj,
                subList: {}
            }
        }
        prev= cursor[minSubj];
        cursor = cursor[minSubj].subList;
    })
    prev._id=_id;
    return acc;
}

exports.fullscanSubject = async (req, res) => {
    try {
        const subjects = await Subject.find().exec();
        const structed = subjects.reduce(makeStructObject,{});
        res.status(200).send({ ...structed });
    } catch (e) {
        res.status(500).send({});
    }
}

exports.readByID = async (req, res) => {
   const {id}=  req.params; 
   const {ObjectId } =  mongoose.Types;
    try {
         const subject = await Subject.findById(id,function(err,subj){
            if(err) {
                 throw new Error('not find');
            }
            res.status(200).send({ subject:subj.name });
         }).exec();

    } catch (e) {
        res.status(500).send({});
    }
}