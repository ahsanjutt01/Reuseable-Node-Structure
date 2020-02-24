const Sequelize = require('sequelize');


const sequelize = require('../utils/database');

const Listing =  sequelize.define('listings', {
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
    isFree: Sequelize.BOOLEAN,
    price: Sequelize.DECIMAL,
    date: Sequelize.DATE,
    isWillingToPayShipingCharges: Sequelize.BOOLEAN,
    isWillingToMeet: Sequelize.BOOLEAN,
    state: Sequelize.STRING,
    isActiveListing: Sequelize.BOOLEAN,
    condition: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
    deleteReason: Sequelize.STRING
});

module.exports = Listing;