const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const ListingImage =  sequelize.define('listingImages', {
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
    isActive: Sequelize.BOOLEAN
});

module.exports = ListingImage;