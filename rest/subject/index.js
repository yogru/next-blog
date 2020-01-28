const express = require('express');
const {middleWareValidObjectID} = require('../../mongo/utils');

const create = require('./create');
const read =  require('./read');
const update =  require('./update');
const del = require('./delete');

const router = express.Router();

//create
router.post('/',create);

//read...
router.get('/' ,read.fullscanSubject);
router.get('/:id',middleWareValidObjectID,read.readByID);

// //read
// router.get('/subject' ,read.readSubjects);
// router.get('/subject/:subject' ,read.readPostBySubject);
// router.get('/:id',middleWareValidObjectID,read.readById);

module.exports = router;
