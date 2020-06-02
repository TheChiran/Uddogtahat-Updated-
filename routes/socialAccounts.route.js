var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var aboutController = require('../controllers/socialAccount.controller');

router.get('/social-accounts',auth.auth,aboutController.getSocialAccountPage);
router.post('/social-accounts',auth.auth,aboutController.socialAccountPost);


module.exports = router;
