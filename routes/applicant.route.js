var express = require('express');
var router = express.Router();
var applicantController = require('../controllers/applicant.controller');
/* GET home page. */
router.get('/register',applicantController.register);
router.post('/register-submit',applicantController.register_submit);
/*router.get('/register-form-1',applicantController.registerForm1);*/
router.post('/register-form-1-submit',applicantController.registerForm1_submit);
//router.get('/register-form-2',applicantController.registerForm2);
router.post('/register-form-2-submit',applicantController.registerForm2_submit);


module.exports = router;
