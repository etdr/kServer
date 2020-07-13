
const sequelize = require('../db')
const { DataTypes } = require('sequelize')

module.exports = sequelize.define('lists', {
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // userId taken care of by database association in db.js
  items: {
    type: DataTypes.BLOB,
    allowNull: true
  }   
})
  
