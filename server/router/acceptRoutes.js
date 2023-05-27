const express = require('express');
const router = express.Router();
const acceptController = require('../controllers/accept')


router.route('/')
.get(acceptController.getAccept)
.post(acceptController.addAccept)

module.exports = router;