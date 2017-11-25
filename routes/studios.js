var express = require('express');
var router = express.Router();
var studiosController = require('../controllers/studiosController');

router.get('/',studiosController.getAll);

module.exports = router;