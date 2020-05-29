var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var contactController = require('../controllers/contact.controller');

router.get('/',contactController.contact);
router.get('/contact-page',auth.auth,contactController.contact_page);
router.post('/contact-page',auth.auth,contactController.contact_page_post);


module.exports = router;
