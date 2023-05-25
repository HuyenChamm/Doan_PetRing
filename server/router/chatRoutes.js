const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat')


router.route('/:id')
.post(chatController.sendMess)

router.route('/')
.get(chatController.getMessSend)
// .get(chatController.getMessReceive)


module.exports = router;