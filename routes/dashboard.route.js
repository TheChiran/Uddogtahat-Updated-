var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var dashboardController = require('../controllers/dashboard.controller');

router.get('/',auth.auth,dashboardController.dashboard);

module.exports = router;
