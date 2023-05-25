const express = require('express');
const router = express.Router();
const pet = require('../controllers/pet') 

router.route('/')
.post(pet.addPet)

router.route('/:id')
.get(pet.getPet)
.post(pet.addPet)

router.route('/mypet/:id')
.get(pet.getMyPet)


module.exports = router;