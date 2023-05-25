const express = require('express');
const router = express.Router();
const search = require('../controllers/search')


router.route('/').get(search.getSearch)


module.exports = router;