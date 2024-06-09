const express = require('express');
const router = express.Router();
const userController = require('../controllers/user'); // Chemin correct basé sur votre structure de projet

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/check-email', userController.checkEmail);

module.exports = router;