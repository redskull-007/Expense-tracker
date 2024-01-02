// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expenses', 'root', 'abhi@mysql100', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
