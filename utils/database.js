const Sequelize = require('sequelize');

const sequelize = new Sequelize('littlewins', 'doadmin', 't83g4j5580bj37m6', {
    dialect: 'mysql',
    host: 'csdb-mysql-nyc1-07501-do-user-7039297-0.db.ondigitalocean.com',
    port: 25060
});


module.exports = sequelize;