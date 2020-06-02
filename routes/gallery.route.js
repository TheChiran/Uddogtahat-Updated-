var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var gallaryController = require('../controllers/gallery.controller');
/* GET home page. */
router.get('/',gallaryController.gallery);
router.get('/page/:page',gallaryController.getPage);
router.get('/gallery-upload',auth.auth,gallaryController.galleryUpload);
router.post('/gallery-post',auth.auth,gallaryController.postGalleryContent);




module.exports = router;
