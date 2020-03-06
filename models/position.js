const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const Position =  sequelize.define('position', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});

module.exports = Position;