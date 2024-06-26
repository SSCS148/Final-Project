const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

router.post('/', commentController.createComment);
router.get('/', commentController.getAllComments);
router.post('/like', commentController.likeComment);

module.exports = router;