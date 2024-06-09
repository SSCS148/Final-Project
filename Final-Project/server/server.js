const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database'); // Chemin correct basé sur votre structure de projet
const User = require('./models/User'); // Chemin correct basé sur votre structure de projet
const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/user'); // Chemin correct basé sur votre structure de projet
app.use('/api/user', userRoutes);

app.use(express.static('client'));

const PORT = process.env.PORT || 5002;

sequelize.sync({ alter: true })
  .then(result => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });