var express = require('express');
var router = express.Router();
var tattooistsController = require('../controllers/tattooistsController');


router.get('/:id',tattooistsController.getAll);
router.get('/:id/images',tattooistsController.getImages);

router.post('/register',tattooistsController.create);
router.post('/update',tattooistsController.update);

module.exports = router;