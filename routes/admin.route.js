var express = require('express');
var router = express.Router();

//this route is for all the work an admin will do

const admincontroller = require('../controllers/admin.controller');
let auth = require('../middleware/admin.panel.authentication');


router.get('/',auth.auth,admincontroller.dashboard);









module.exports = router;
