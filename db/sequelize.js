const Sequelize = require('sequelize')
const sequelize = new Sequelize('test', 'root', '', {
  dialect: 'sqlite',
  storage: './db.sqlite3'
})


module.exports = sequelize