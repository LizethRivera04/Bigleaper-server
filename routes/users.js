const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers')

//create user 
//POST/users
router.post('/',
    usersController.userCreate
);


module.exports = router;