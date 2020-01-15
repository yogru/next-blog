const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const curd = require('./crud');

//오브젝트 검사로직. 만들어야됨.
const {ObjectId}= mongoose.Types;

router.get('/' ,curd.readSubjects);
router.get('/:subject' ,curd.readPostBySubject);
router.post('/',curd.create);
router.put('/:id',curd.updateById);
router.delete('/:id',curd.removeById);

module.exports= router;
