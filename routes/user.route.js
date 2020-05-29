var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var adminUserController = require('../controllers/user.controller');

router.get('/dashboard',adminUserController.dashboard);
router.get('/sign-in',adminUserController.sign_in);
router.post('/sign-in',adminUserController.sign_in_post);
router.post('/sign-up',auth.auth,adminUserController.setNewUser);
router.get('/setting',auth.auth,adminUserController.settings)
router.post('/change/user-name',auth.auth,adminUserController.changeUserName);
router.post('/change/password',auth.auth,adminUserController.changeUserPassword);
router.post('/change/profile-picture',auth.auth,adminUserController.changeUserProfilePicture);
router.get('/logout',auth.auth,adminUserController.logout);

module.exports = router;
