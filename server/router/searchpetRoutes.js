const express = require('express');
const router = express.Router();
const searchpet= require('../controllers/searchpet')


router.route('/').get(searchpet.getSearchPet)


module.exports = router;