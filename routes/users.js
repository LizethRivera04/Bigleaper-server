const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers')
const { verifyToken } = require('../middleware/verifyToken');

//create user 
//POST/users
router.post('/',
    usersController.userCreate
);

//get list of users guests
router.get('/',
    verifyToken,
    usersController.usersList
)


module.exports = router;