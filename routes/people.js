var express = require('express');
var router = express.Router();
var peopleController = require('../controllers/peopleController');

router.post('/person',peopleController.insert);

module.exports = router;