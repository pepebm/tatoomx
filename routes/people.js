var express = require('express');
var router = express.Router();
var peopleController = require('../controllers/peopleController');

router.get('/:id/images', peopleController.getImages);
router.get('/:id/tattooists',peopleController.getTattooists);
router.get('/:id/studios',peopleController.getStudios);

router.post('/likeimage',peopleController.likeImage);
router.post('/liketattooist',peopleController.likeTattooist);
router.post('/likestudio',peopleController.likeStudio);
router.post('/dislikeimage',peopleController.deleteLikeImage);
router.post('/disliketattooist',peopleController.deleteLikeTattooist);
router.post('/dislikestudio',peopleController.deleteLikeStudio);

router.post('/register', peopleController.create);

module.exports = router;