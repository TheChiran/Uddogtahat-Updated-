var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var committeeController = require('../controllers/committee.controller');

router.get('/',committeeController.commitee_page);
router.get('/page/:page',committeeController.commitee_get_page);
router.get('/committee-post',auth.auth,committeeController.get_committee_page);
router.post('/committee-post',auth.auth,committeeController.committee_page_post);



module.exports = router;
