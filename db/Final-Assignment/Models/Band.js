/**
 * @author : akshatjain
 */

//Band ORM

const Band = (sequelize, api) => {
    return sequelize.define('band', {
        bandID: {
            type: api.BIGINT,
            primaryKey: true,
            autoIncrement : true
        },
        bandName: {
            type: api.STRING,
            allowNull:false
        },
        bandDesc: {
            type: api.STRING,
            allowNull:false
        },
        bandBy: {
            type: api.STRING,
            allowNull:false
        }
    },{
        timestamps: false
    })
}

module.exports = (sequelize, api) => Band(sequelize, api)