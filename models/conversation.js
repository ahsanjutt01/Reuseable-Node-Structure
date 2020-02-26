const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const Conversation =  sequelize.define('conversations', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isActive: Sequelize.BOOLEAN
});

module.exports = Conversation;