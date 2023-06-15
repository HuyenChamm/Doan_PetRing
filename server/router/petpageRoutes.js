const express = require('express');
const router = express.Router();
const petpage = require('../controllers/petpage') 

router.route('/:id')
.get(petpage.getPet)

module.exports = router;