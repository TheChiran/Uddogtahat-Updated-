var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var memberController = require('../controllers/member.controller');
/* GET home page. */
router.get('/list',memberController.members);
router.get('/page/:page',memberController.members_get_page);



module.exports = router;
