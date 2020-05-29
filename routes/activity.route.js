var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var activityController = require('../controllers/activity.controller');
/* GET home page. */
router.get('/',activityController.activities);
router.get('/page/:page',activityController.activities_get_page);
router.get('/:id',activityController.activitiesSingle);
router.get('/get/activity-page',auth.auth,activityController.get_activity_page);
router.post('/activity-post',auth.auth,activityController.activity_post);
router.get('/category/get-page',activityController.category);
router.post('/category/post',activityController.category_post);
router.get('/activityPageHeader/get',auth.auth,activityController.activityPageHeader);
router.post('/activityPageHeader/post',auth.auth,activityController.activityPageHeaderPost);


module.exports = router;
