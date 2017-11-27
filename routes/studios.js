var express = require('express');
var router = express.Router();
var studiosController = require('../controllers/studiosController');

router.get('/',studiosController.getAll);
router.get('/:id/tattooists',studiosController.getTattooists);

module.exports = router;