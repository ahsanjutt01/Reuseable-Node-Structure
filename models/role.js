const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const Role =  sequelize.define('roles', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Role;