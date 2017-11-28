var express = require('express');
var router = express.Router();
var imagesController = require('../controllers/imagesController');

router.get('/',imagesController.getAll);

router.post('/add',imagesController.add);
router.post('/delete',imagesController.delete);

module.exports = router;