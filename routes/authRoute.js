const express = require('express');
// const { registerUser } = require('../client/src/pages/Register');
const authController = require('../controllers/authController')
const router = express.Router();

router.post('/register', authController.signUp) // /api/user/register : on declanche la fonction signUp

// router.post('/register', registerUser)

module.exports = router