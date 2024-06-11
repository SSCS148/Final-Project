const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

exports.createPost = async (req, res) => {
    const { message } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    let photo = null;

    try {
        const decoded = jwt.verify(token, 'secretKey');
        const userId = decoded.id;

        if (req.file) {
            photo = req.file.filename;
        }

        const newPost = await Post.create({ message, photo, userId });
        res.json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(400).json({ message: error.message });
    }
};