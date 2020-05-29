var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var websiteTitleController = require('../controllers/website-title.controller');

router.post('/change',auth.auth,websiteTitleController.website_title_change);

module.exports = router;
