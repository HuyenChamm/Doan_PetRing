const express = require('express');
const router = express.Router();
const personalpostController = require('../controllers/personalpost')

router.route('/:id')
.get(personalpostController.getPost)
.delete(personalpostController.deletePost)


router.route('/')
.delete(personalpostController.deletePost)
.put(personalpostController.editPost)

router.route('/pagepost/:id')
.get(personalpostController.getPagePost)

module.exports = router;