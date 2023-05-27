const express = require('express');
const router = express.Router();
const zooController = require('../controllers/zoo'); 

router.route('/')
.get(zooController.getAllPet)


module.exports = router;