const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const UserRole =  sequelize.define('userRoles', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = UserRole;