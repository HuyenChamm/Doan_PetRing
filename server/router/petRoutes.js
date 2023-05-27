const express = require('express');
const router = express.Router();
const pet = require('../controllers/pet') 

router.route('/')

.post(pet.addPet)
.delete(pet.deletePet)


router.route('/:id')
.get(pet.getPet)
.post(pet.addPet)


router.route('/mypet/:id')
.get(pet.getMyPet)


router.route('/editpet/:id')
.get(pet.getEditPet)


router.route('/editpet')
.put(pet.EditPet)




module.exports = router;