var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var contactController = require('../controllers/contact.controller');

router.get('/',contactController.contactPage);
router.get('/contact-page',auth.auth,contactController.getContactPage);
router.post('/contact-page',auth.auth,contactController.contactContentPost);


module.exports = router;
