

function createBand(Band, band, callback) {
    Band.build(band).save().then((data) => {
            callback({
                msg: 'Data Stored Successfully',
                band: data
            })
        })
        .catch((err) => {
            console.log("Error"+err)
            callback({
                msg: 'Error in Inserting Data',
                reason: err
            })
        })
}

function getSingleBand(Band, bandID, username, callback) {
    Band.findOne({
            where: {
                bandID: Number(bandID),
                bandBy: username
            }
        }).then(band => {
            callback(band.get({
                plain: true
            }))
        })
        .catch((err) => {
            callback({
                msg: 'Unable To Fetch Data',
                reason: err
            })
        })
}

function getAllBands(Band, username, callback) {
    Band.findAll({
            where: {
                bandBy: username
            }
        }).then(bands => {
            callback(bands.map(b => b.get({
                plain: true
            })))
        })
        .catch((err) => {
            callback({
                msg: 'Unable To Fetch Data',
                reason: err
            })
        })
}

function updateBand(Band, bandID, username, band, callback) {
    getSingleBand(Band, bandID, username, (res) => {
        if (res.bandBy === username) {
            Band.update(band, {
                    where: {
                        bandID: Number(bandID)
                    }
                }).then((band) => {
                    callback({
                        msg: "Band Updated Successfully"
                    })
                })
                .catch((err) => {
                    callback({
                        msg: 'Unable To Update Band',
                        reason: err
                    })
                })
        } else {
            callback({
                msg: 'Unable To Update Band',
                reason: "The Band Does not Belongs To You"
            })
        }
    })
}

function deleteBand(Band, bandID, username, callback) {
    getSingleBand(Band, bandID, username, (res) => {
        if (res.bandBy === username) {
            Band.destroy({
                    where: {
                        bandID: Number(bandID)
                    }
                }).then((band) => {
                    callback({
                        msg: "Band Deleted Successfully"
                    })
                })
                .catch((err) => {
                    callback({
                        msg: 'Unable To Delete Band',
                        reason: err
                    })
                })
        } else {
            callback({
                msg: 'Unable To Delete Band',
                reason: "The Band Does not Belongs To You"
            })
        }
    })
}

module.exports = {
    createBand,
    getSingleBand,
    getAllBands,
    updateBand,
    deleteBand
}