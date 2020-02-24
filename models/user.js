const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const User =  sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    zipCode: Sequelize.STRING,
    isAgreeTerms: Sequelize.BOOLEAN,
    isActive: Sequelize.BOOLEAN
});

module.exports = User;