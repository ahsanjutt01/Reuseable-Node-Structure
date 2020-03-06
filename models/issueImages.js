const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const IssueImage =  sequelize.define('issueImages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isMarkAsDefault: Sequelize.BOOLEAN,
    isActive: Sequelize.BOOLEAN
});

module.exports = IssueImage;