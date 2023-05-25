const express = require('express');
const router = express.Router();
const post = require('../controllers/post')

router.route('/')
.get(post.getAllPost).post(post.addPost)


module.exports = router;