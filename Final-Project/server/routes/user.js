const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const commentController = require('../controllers/comment'); // Ajout de cette ligne

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/check-email', userController.checkEmail);
router.get('/all', userController.getAllUsers);
router.post('/refresh-token', userController.refreshToken);

// Routes pour les commentaires et les likes
router.post('/comments', commentController.createComment);
router.post('/like', commentController.likeComment);
router.get('/comments', commentController.getAllComments);

module.exports = router;