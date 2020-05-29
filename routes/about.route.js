var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var aboutController = require('../controllers/about.controller');

router.get('/',aboutController.about);
router.get('/about-page',auth.auth,aboutController.about_page);
router.post('/about-page',auth.auth,aboutController.about_page_post);


module.exports = router;
