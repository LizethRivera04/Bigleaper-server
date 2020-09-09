const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


//authentication user
//POST/
router.post('/',
    authController.userAuthentication
)


//Get user auth
//GET/
// router.get('/',
// authControler.user
// )
module.exports = router;