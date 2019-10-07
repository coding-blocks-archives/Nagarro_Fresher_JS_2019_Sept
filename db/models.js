const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const { Model } = Sequelize

class User extends Model { }

User.init({
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  gender: Sequelize.ENUM(['Male', 'Female'])
}, { sequelize, modelName: 'users' })

module.exports = {
  User,
  sequelize
}