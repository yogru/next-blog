const mongoose = require('mongoose');
const POST = require('../../mongo/shema/post');
const Post = mongoose.model('POST', POST.schema);

module.exports = async (req, res) => {
  const { title, subjectID, writer, body, comment }
    = req.body;
  const { error } = POST.validate({
    title ,subjectID, writer, body, comment
  });
  if (error) {
    res.status(404).send({});
    console.log(error);
    return;
  }
   await Post.create({ title, subjectID, writer, body, comment }, (err, doc) => {
      if (err){
        res.status(500).send({ Error:err });
        return;
      }
       res.status(200).send({ _id: doc._id });
    });
}

