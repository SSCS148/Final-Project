const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {});

app.use(cors()); // Utiliser le middleware CORS
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// Serve static files
app.use(express.static('client'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));