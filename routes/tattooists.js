var express = require('express');
var router = express.Router();
var tattooistsController = require('../controllers/tattooistsController');

router.get('/',tattooistsController.getAll);
router.get('/:id',tattooistsController.getOne); // CREO QUE NEL
router.get('/:id/images',tattooistsController.getImages);

router.post('/register',tattooistsController.create);

module.exports = router;