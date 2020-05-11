var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var indexController = require('../controllers/index.controller');
/* GET home page. */
router.get('/',indexController.index);






router.get('/activities',indexController.activities);
router.get('/activities/page/:page',indexController.activities_get_page);
router.get('/activities-single/:id',indexController.activitiesSingle);
router.get('/about',indexController.about);
router.get('/contact',indexController.contact);
router.get('/gallary',indexController.gallary);
router.get('/gallary/page/:page',indexController.gallary_get_page);
router.get('/members',indexController.members);
router.get('/members/page/:page',indexController.members_get_page);
router.get('/commitee',indexController.commitee_page);
router.get('/commitee/page/:page',indexController.commitee_get_page);
router.get('/upcoming',indexController.upcoming_event);
router.get('/update',indexController.update_event);
router.get('/event/:id',indexController.event_single);

module.exports = router;
