const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $or: Op.or,
  $eq: Op.eq,
  $ne: Op.ne,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
  $and: Op.and,
  $like: Op.like,
};


const sequelize = new Sequelize('littlewins', 'doadmin', 't83g4j5580bj37m6', {
    dialect: 'mysql',
    host: 'csdb-mysql-nyc1-07501-do-user-7039297-0.db.ondigitalocean.com',
    port: 25060,
    operatorsAliases: operatorsAliases
});


module.exports = sequelize;