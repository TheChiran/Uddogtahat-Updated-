var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var gallaryController = require('../controllers/gallary.controller');
/* GET home page. */
router.get('/',gallaryController.gallary);
router.get('/page/:page',gallaryController.gallary_get_page);
router.get('/gallary-upload',auth.auth,gallaryController.gallary_upload);
router.post('/gallary-post',auth.auth,gallaryController.gallary_post);




module.exports = router;
