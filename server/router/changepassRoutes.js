const express = require('express');
const router = express.Router();
const changepassController = require('../controllers/changepass');

router.route('/')
  .put(changepassController.changePass)


module.exports = router;