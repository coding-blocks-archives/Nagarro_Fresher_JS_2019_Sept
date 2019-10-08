/**
 * @author : akshatjain
 */
var Sequelize = require("sequelize")

var BandModel = require("../Models/Band")
var UserModel = require("../Models/User")

function dbConnect(dbConfig) {
    return new Promise((resolve, error) => {
        var sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUsername, dbConfig.dbPassword, {
            host: dbConfig.internal.url,
            port: dbConfig.internal.port,
            dialect: dbConfig.internal.dialect
        })
        return resolve(sequelize)
    })
}

function connectToDB(dbConfig) {
    return new Promise((resolve, error) => {
        dbConnect(dbConfig).then((sequelize) => {
            var User = UserModel(sequelize, Sequelize)
            var Band = BandModel(sequelize, Sequelize)

            User.hasMany(Band, {
                foreignKey: 'bandBy'
            })

            sequelize.sync(
                    /**
                    *Do Not Run this Option/Config During Production
                    {
                        force: true
                    }
                    */
                ).then(() => {
                    return resolve({
                        User,
                        Band
                    })
                })
                .catch((err) => console.log(err))
        })
    })
}

module.exports = {
    connectToDB
}