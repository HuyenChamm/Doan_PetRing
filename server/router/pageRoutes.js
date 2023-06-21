
const express = require('express');
const router = express.Router();
const pageController = require('../controllers/page');


router.route('/:id')
  .get(pageController.getUser)

module.exports = router;