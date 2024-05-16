const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('codesfortomorrow', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
