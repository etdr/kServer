
const sequelize = require('../db')
const { DataTypes } = require('sequelize')

module.exports = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
