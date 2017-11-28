var express = require('express');
var router = express.Router();
var imagesController = require('../controllers/imagesController');

router.post('/add',imagesController.add);
router.post('/delete',imagesController.delete);
router.get('/:id',imagesController.getAll);

module.exports = router;