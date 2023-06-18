const express = require('express');
// const { registerUser } = require('../client/src/pages/Register');
const authController = require('../controllers/authController')
const userController = require('../controllers/user.controller')
const router = express.Router();

router.post('/register', authController.signUp) // /api/user/register : on declanche la fonction signUp 
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo)

// router.post('/register', registerUser)

module.exports = router