const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');


router.route('/')
.get(commentController.getAllComment)

  
router.route('/:id')
.post(commentController.addComment)


module.exports = router;