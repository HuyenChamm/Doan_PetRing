const express = require('express');
const router = express.Router();
const personalpageController = require('../controllers/personalpage');


router.route('/:id')
  .get(personalpageController.getUser)

module.exports = router;