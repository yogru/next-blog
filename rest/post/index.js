const express = require('express');
const curd = require('./crud');
const paging = require('./paging');
const topN = require('./topN');
const {middleWareValidObjectID} = require('../../mongo/utils');

const router = express.Router();

router.get('/' ,curd.readSubjects);
router.post('/',curd.create);
router.put('/:id',middleWareValidObjectID,curd.updateById);
router.delete('/:id',middleWareValidObjectID,curd.removeById);

router.get('/page/',paging);
router.get('/topN/',topN);

// 서브젝트 에러처리하기.
router.get('/:subject' ,curd.readPostBySubject);

module.exports= router;
