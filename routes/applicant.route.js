var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var applicantController = require('../controllers/applicant.controller');
/* GET home page. */
router.get('/register',applicantController.registerPage);
router.post('/register-submit',applicantController.register_submit);
router.post('/register-form-1-submit',applicantController.registerForm1Submit);
router.post('/register-form-2-submit',applicantController.registerForm2Submit);
router.get('/request-list',auth.auth,applicantController.memberRequestList);
router.get('/add-member',auth.auth,applicantController.addNewMemberPage);
router.post('/member-register-1',auth.auth,applicantController.memberRegister1);
router.post('/member-register-2',auth.auth,applicantController.memberRegister2);
router.post('/member-register-complete',auth.auth,applicantController.registerComplete);
router.get('/full-info/:mobile',auth.auth,applicantController.memberFullInfo);
router.post('/approve/:mobile',auth.auth,applicantController.memberApprove);
router.post('/delete/:mobile',auth.auth,applicantController.member_delete);




module.exports = router;
