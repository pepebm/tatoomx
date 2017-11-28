var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');
var path = require('path');

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/storage/:file',function(req,res) {
	var _path = __dirname + '/../storage/' + req.params.file;
	res.sendFile(path.resolve(_path));
});

router.post('/login', loginController.login);

module.exports = router;
