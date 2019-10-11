module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        user_id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
            type: type.STRING,
            defaultValue: null
        },
        useremail: {
            type: type.STRING,
            defaultValue: null
        },
        userdob:{
            type: type.STRING,
            defaultValue: null
        },
        upassword:{
            type: type.STRING,
            dafaultValue: null
        }
    })
}