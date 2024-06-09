const express = require('express');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { sequelize, User, Comment } = require('./models/User'); // Assurez-vous que le chemin est correct
=======
const jwt = require('jsonwebtoken');
const { sequelize, User, Comment } = require('./models/models'); // Assurez-vous que le chemin est correct
>>>>>>> 0709814 (ok)
const app = express();
const PORT = 5002;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/user/register', async (req, res) => {
    const { name, email, password, age } = req.body;
<<<<<<< HEAD
    console.log('Register request received:', req.body);  // Ajoutez cette ligne pour vérifier les données reçues
=======
>>>>>>> 0709814 (ok)
    try {
        const user = await User.create({ name, email, password, age });
        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/user/login', async (req, res) => {
    const { email, password } = req.body;
<<<<<<< HEAD
    console.log('Login request received:', req.body);  // Ajoutez cette ligne pour vérifier les données reçues
=======
>>>>>>> 0709814 (ok)
    try {
        const user = await User.findOne({ where: { email, password } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/user/all', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/comments', async (req, res) => {
    const { comment } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secretkey');
        const userId = decoded.id;
        const newComment = await Comment.create({ comment, userId });
        res.json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/comments', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json({ comments });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced');
    } catch (error) {
        console.error('Unable to sync database:', error);
    }
});