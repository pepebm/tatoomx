var express = require('express');
var router = express.Router();
var tattooistsController = require('../controllers/tattooistsController');

router.get('/',tattooistsController.getAll);
router.get('/:id',tattooistsController.getOne);
router.post('/register',tattooistsController.create)

module.exports = router;