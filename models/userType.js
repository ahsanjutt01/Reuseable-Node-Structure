const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const UserType =  sequelize.define('userTypes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = UserType;