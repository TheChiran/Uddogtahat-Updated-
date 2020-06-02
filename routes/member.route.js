var express = require('express');
var router = express.Router();


var memberController = require('../controllers/member.controller');
/* GET home page. */
router.get('/list',memberController.memberList);
router.get('/page/:page',memberController.memberGetPage);



module.exports = router;
