var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var activityController = require('../controllers/activity.controller');
/* GET home page. */
router.get('/list',activityController.activityList);
router.get('/page/:page',activityController.activityListPage);
router.get('/:id',activityController.activitySingle);
router.get('/get/activity-page',auth.auth,activityController.getActivityPage);
router.post('/activity-post',auth.auth,activityController.activityPost);
router.get('/category/get-page',activityController.categoryPage);
router.post('/category/post',activityController.categoryPost);
router.get('/activityPageHeader/get',auth.auth,activityController.activityPageHeader);
router.post('/activityPageHeader/post',auth.auth,activityController.activityPageHeaderPost);


module.exports = router;
