var express = require('express');
var router = express.Router();

let auth = require('../middleware/admin.panel.authentication');
var ambassadorController = require('../controllers/ambassador.controller');

router.get('/',ambassadorController.ambassador);
router.get('/page/:page',ambassadorController.ambassador);
router.get('/post',auth.auth,ambassadorController.ambassadorPage);
router.post('/upload',auth.auth,ambassadorController.assignCampusAmbassador)



module.exports = router;
