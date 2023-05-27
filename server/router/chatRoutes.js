const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat')


router.route('/:id')
.post(chatController.sendMess)

router.route('/')



router.route('/send')
.get(chatController.getMessSend)

router.route('/receive')
.get(chatController.getMessReceive)


module.exports = router;