var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var indexController = require('../controllers/index.controller');
/* GET home page. */
router.get('/',indexController.index);
router.get('/logo-upload',auth.auth,indexController.get_logo_upload_page);
router.post('/logo-upload',auth.auth,indexController.logo_upload);
router.get('/quotes',auth.auth,indexController.get_quotes_page);
router.post('/quotes-post',auth.auth,indexController.quotes_post);
router.get('/home-page-event',auth.auth,indexController.home_page_event);
router.post('/home-page-event',auth.auth,indexController.home_page_event_post);
router.get('/home-page-about',auth.auth,indexController.get_about_home_page);
router.post('/about-contents-background',auth.auth,indexController.post_about_contents_background);
router.post('/about-contents',auth.auth,indexController.post_about_contents);
router.get('/homePageSlider',auth.auth,indexController.homePageSlider);
router.post('/homePageSliderPost',auth.auth,indexController.homePageSliderPost);


module.exports = router;
