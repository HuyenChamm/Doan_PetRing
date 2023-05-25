const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like');


router.route('/')
.get(likeController.getAllLike)
.post(likeController.addLike)
.delete(likeController.deleteLike)

router.route('/status')
.get(likeController.getStatusLike)


module.exports = router;