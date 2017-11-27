var express = require('express');
var router = express.Router();
var peopleController = require('../controllers/peopleController');

router.get('/:id/images', peopleController.getImages);
router.get('/:id/tattooists',peopleController.getTattooists);
router.get('/:id/studios',peopleController.getStudios);

router.post('/likeimage',peopleController.likeImage);
router.post('/liketattooist',peopleController.likeTattooist);
router.post('/likestudio',peopleController.likeStudio);
router.post('/deletelike/image',peopleController.deleteLikeImage);
router.post('/deletelike/tattooist',peopleController.deleteLikeTattooist);
router.post('/deletelike/studio',peopleController.deleteLikeStudio);

router.post('/register', peopleController.create);

module.exports = router;