var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var eventController = require('../controllers/event.controller');


router.get('/',auth.auth,eventController.getEventPage);
router.get('/upcoming',eventController.upcomingEventList);
router.get('/update',eventController.updateEventList);
router.get('/:id',eventController.eventSingle);
router.get('/manage/events',auth.auth,eventController.manageEvents);
router.post('/done/:id',auth.auth,eventController.changeEventToDone);
router.post('/post',auth.auth,eventController.eventPost);

module.exports = router;
