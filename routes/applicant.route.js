var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var applicantController = require('../controllers/applicant.controller');
/* GET home page. */
router.get('/register',applicantController.register);
router.post('/register-submit',applicantController.register_submit);
router.post('/register-form-1-submit',applicantController.registerForm1_submit);
router.post('/register-form-2-submit',applicantController.registerForm2_submit);
router.get('/request-list',auth.auth,applicantController.member_requests);
router.get('/add-member',auth.auth,applicantController.add_new_member);
router.post('/member-register-1',auth.auth,applicantController.member_register_1);
router.post('/member-register-2',auth.auth,applicantController.member_register_2);
router.post('/member-register-complete',auth.auth,applicantController.register_complete);
router.get('/full-info/:mobile',auth.auth,applicantController.member_full_info);
router.post('/approve/:mobile',auth.auth,applicantController.member_approve);
router.post('/delete/:mobile',auth.auth,applicantController.member_delete);


module.exports = router;
