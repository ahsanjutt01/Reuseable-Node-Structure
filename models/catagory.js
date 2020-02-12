const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const Catagory =  sequelize.define('catagories', {
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
    isActive: Sequelize.BOOLEAN
});

module.exports = Catagory;