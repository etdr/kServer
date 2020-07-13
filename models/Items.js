
const Sequelize = require('sequelize');
const sequelize = require('../db')
const { DataTypes } = require('sequelize')

module.exports = sequelize.define('items', {
  listId: {
    type: DataTypes.INTEGER,
    primaryKey: true  
  },
  itemId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

