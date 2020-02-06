const mongoose = require('mongoose');
const POST = require('../../mongo/shema/post');
const Post = mongoose.model('POST', POST.schema);

//함수 조합해서 쓰자. 
//지금은 일단 구현에 치중..
exports.getTitleBySubjectID = async (req, res) => {
  const { subjectID } = req.params;
  try {
    const titles =
      await Post.find({ "subjectID": { $eq: subjectID } }, { "title": true })
    res.status(200).send([...titles]);
  } catch (err) {
    res.status(500).send([]);
  }
}

exports.readById = async (req, res) => {
  const { id } = req.params;
  const { ObjectId } = mongoose.Types;

  const findCallback = (err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ doc });
  }

  if (!ObjectId.isValid(id)) { 
    console.log('readbyID>>>',id)
    await Post.find(findCallback).sort({ time: -1 }).limit(1)
    return;
  }
  await Post.findById(new ObjectId(id), findCallback);
}
