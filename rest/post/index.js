const express = require('express');
const paging = require('./paging');
const topN = require('./topN');
const {middleWareValidObjectID} = require('../../mongo/utils');
const {myMulter,imageUploader} = require('./ImageUploader');

const create = require('./create');
const read =  require('./read');
const update =  require('./update');
const del = require('./delete');

const router = express.Router();

//create
router.post('/',create);

//read
router.get('/titles/:subjectID' ,read.getTitleBySubjectID);
router.get('/:id',middleWareValidObjectID,read.readById);

// router.get('/subject' ,read.readSubjects);
// router.get('/subject/:subject' ,read.readPostBySubject);
// router.get('/page/',paging);
// router.get('/topN/',topN);

// // update
// router.put('/:id',middleWareValidObjectID,update.updateById);

// //delete
// router.delete('/:id',middleWareValidObjectID,del.removeById);

// //upload
// router.post('/up/img', myMulter.single('img') , imageUploader);

module.exports= router;
