var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var aboutController = require('../controllers/socialAccount.controller');

router.get('/social-accounts',auth.auth,aboutController.social_accounts);
router.post('/social-accounts',auth.auth,aboutController.social_accounts_post);


module.exports = router;
