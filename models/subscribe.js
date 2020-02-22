const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const Subscribe  = sequelize.define('subscribe', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isActive: Sequelize.BOOLEAN
});

module.exports = Subscribe;