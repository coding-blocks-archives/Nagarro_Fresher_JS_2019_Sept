module.exports = (sequelize, type) => {
    return sequelize.define('bands', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        bandname: {
            type: type.STRING,
            defaultValue: null
        },
        description:{
            type: type.STRING,
            dafaultValue: null
        },
        number_of_members:{
            type: type.INTEGER,
            defaultValue: 0
        }
    })
} 