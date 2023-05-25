const express = require('express');
const router = express.Router();
const friend = require('../controllers/friend')


router.route('/:id').get(friend.getAllFriend)


module.exports = router;