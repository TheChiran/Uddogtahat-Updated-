var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var eventController = require('../controllers/event.controller');


router.get('/',auth.auth,eventController.event_page);
router.get('/upcoming',eventController.upcoming_event);
router.get('/update',eventController.update_event);
router.get('/:id',eventController.event_single);
router.get('/manage/events',auth.auth,eventController.manage_events);
router.post('/done/:id',auth.auth,eventController.event_done);
router.post('/post',auth.auth,eventController.event_page_post);

module.exports = router;
