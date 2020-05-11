var express = require('express');
var router = express.Router();

//this route is for all the work an admin will do

const admincontroller = require('../controllers/admin.controller');
let auth = require('../middleware/admin.panel.authentication');

router.get('/login',admincontroller.login); //to get login page
router.post('/login',admincontroller.loginPost); //to post or give username and password
router.get('/',auth.auth,admincontroller.dashboard);
router.get('/gallary',auth.auth,admincontroller.gallary);
router.post('/gallary',auth.auth,admincontroller.gallary_post);
router.get('/activities',auth.auth,admincontroller.activities);
router.post('/activities',auth.auth,admincontroller.activities_post);
router.get('/category',auth.auth,admincontroller.category);
router.post('/category',auth.auth,admincontroller.category_post);
router.get('/member-requests',auth.auth,admincontroller.member_requests);
router.get('/add-member',auth.auth,admincontroller.add_new_member);
router.post('/member-register-1',auth.auth,admincontroller.member_register_1);
router.post('/member-register-2',auth.auth,admincontroller.member_register_2);
router.post('/member-register-complete',auth.auth,admincontroller.register_complete);
router.get('/message-requests/fullinfo/:mobile',auth.auth,admincontroller.member_full_info);
router.post('/member-requests/approve/:mobile',auth.auth,admincontroller.member_approve);
router.post('/member-requests/delete/:mobile',auth.auth,admincontroller.member_delete);
router.get('/contact-page',auth.auth,admincontroller.contact_page);
router.post('/contact-page',auth.auth,admincontroller.contact_page_post);
router.get('/event-page',auth.auth,admincontroller.event_page);
router.post('/event-post',auth.auth,admincontroller.event_page_post);
router.get('/committee',auth.auth,admincontroller.committee_page);
router.post('/committee-post',auth.auth,admincontroller.committee_page_post);
router.get('/about-page',auth.auth,admincontroller.about_page);
router.post('/about-page',auth.auth,admincontroller.about_page_post);
router.get('/manage-events',auth.auth,admincontroller.manage_events);
router.post('/manage-events/done/:id',auth.auth,admincontroller.event_done);
router.get('/social-accounts',auth.auth,admincontroller.social_accounts);
router.post('/social-accounts',auth.auth,admincontroller.social_accounts_post);
router.get('/logo-upload',auth.auth,admincontroller.logo_upload_get);
router.post('/logo-upload',auth.auth,admincontroller.logo_upload);
router.get('/quotes',auth.auth,admincontroller.get_quotes_page);
router.post('/quotes-post',auth.auth,admincontroller.quotes_post);
router.get('/home-page-about',auth.auth,admincontroller.get_about_home_page);
router.post('/about-contents',auth.auth,admincontroller.post_about_contents);
router.post('/about-contents-background',auth.auth,admincontroller.post_about_contents_background);
router.get('/home-page-event',auth.auth,admincontroller.home_page_event);
router.post('/home-page-event',auth.auth,admincontroller.home_page_event_post);
router.post('/websitetitle',auth.auth,admincontroller.website_title_post);
router.get('/homePageSlider',auth.auth,admincontroller.homePageSlider);
router.post('/homePageSliderPost',auth.auth,admincontroller.homePageSliderPost);
router.get('/activityPageHeader',auth.auth,admincontroller.activityPageHeader);
router.post('/activityPageHeader',auth.auth,admincontroller.activityPageHeaderPost);
router.get('/setting',auth.auth,admincontroller.adminSettings);
router.post('/setting/changeUserName',auth.auth,admincontroller.changeUserName);
router.post('/setting/changeUserPassword',auth.auth,admincontroller.changeUserPassword);
router.post('/setting/changeUserProfilePicture',auth.auth,admincontroller.changeUserProfilePicture);
router.get('/logout',admincontroller.logout);
router.post('/setNewUser',auth.auth,admincontroller.setNewUser);


module.exports = router;
