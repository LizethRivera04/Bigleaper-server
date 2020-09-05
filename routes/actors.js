const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const actorsController = require('../controllers/actorsController');


//Save a new actor if has a token
//POST/actors
router.post('/',
    verifyToken,
    actorsController.actorCreate
)



//Update an actor if has a token
//PUT/actors/id
router.put('/:id',
    verifyToken,
    actorsController.actorUpdate
)



//Get all actors if has a token
//GET/actors
router.get('/',
    verifyToken,
    actorsController.actorsList
)


//Get an actor if has a token
//GET/actors/id
router.get('/:id',
    verifyToken,
    actorsController.actor

)


//Delete an actor if has a token
//DELETE/actors/id
router.delete('/:id',
    verifyToken,
    actorsController.actorDelete

)

module.exports = router;