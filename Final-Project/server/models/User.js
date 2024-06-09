const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Chemin correct basé sur votre structure de projet

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true // ou false si cette colonne est obligatoire
    }
});

module.exports = User;