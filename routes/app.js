var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController')

router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/login', loginController.login);

module.exports = router;
