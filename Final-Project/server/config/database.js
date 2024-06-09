const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'your_username', 'your_password', {
  host: 'localhost',
  port: 5432, // Utilisez le port que vous avez configuré dans postgresql.conf
  dialect: 'postgres'
});

module.exports = sequelize;