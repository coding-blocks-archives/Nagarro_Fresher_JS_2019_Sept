const DB = require('./models')
const { Op } = require('sequelize')

// console.log(DB.User.findAll())

DB.sequelize.sync().then(() => console.log("Synced"))


// DB.User.findAll({
//   where: {
//     email: {
//       [Op.like]: '%abhishek%'
//     }
//   }
// }).then(users => {
//   console.log(users.map(u => u.get({plain: true})))
// })

DB.User.findByPk(1).then(user => {
  console.log(user.get({plain: true}))
})


