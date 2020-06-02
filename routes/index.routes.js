var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var indexController = require('../controllers/index.controller');

/* GET home page. */
router.get('/',indexController.homePage);
router.get('/logo-upload',auth.auth,indexController.logoUpload);
router.post('/logo-upload',auth.auth,indexController.logoUploadPost);
router.get('/quotes',auth.auth,indexController.quotePage);
router.post('/quotes-post',auth.auth,indexController.quotePost);
router.get('/home-page-event',auth.auth,indexController.homePageEvent);
router.post('/home-page-event',auth.auth,indexController.homePageEventPost);
router.get('/home-page-about',auth.auth,indexController.homePageAbout);
router.post('/about-contents',auth.auth,indexController.homePageAboutContentPost);
router.post('/about-contents-background',auth.auth,indexController.homePageAboutContentBackgroundPost);
router.get('/homePageSlider',auth.auth,indexController.homePageSlider);
router.post('/homePageSliderPost',auth.auth,indexController.homePageSliderPost);



module.exports = router;
