var express = require('express');
var router = express.Router();
var peopleController = require('../controllers/peopleController');

router.post('/register', peopleController.create);

module.exports = router;