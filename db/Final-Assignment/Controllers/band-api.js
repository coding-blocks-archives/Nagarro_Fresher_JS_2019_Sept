/**
 * @author : akshatjain
 */
var express = require("express")
var bandService = require("../Services/band-service")
var encryption = require("../Services/encryption")

var router = express.Router()

var {
    getDecodedUser
} = encryption

//Secure the API from the Defaut (*use*) function
router.use((req, res, next) => {
    console.log(`Api Hit @ : ${req.url}`)
    if (!req.headers.authorization) {
        return res.status(403).json({
            error: 'Not all credentials sent!'
        })
    }
    next()
})

function callbackAPIs(dataSet) {
    //Get All Bands of a particular user
    router.get("/band/", (req, res) => {
        let username = getDecodedUser(req.headers.authorization)
        bandService.getAllBands(dataSet, username, resp => res.json(resp))
    })

    //Get Single Band by band id
    router.get("/band/:bandid", (req, res) => {
        let username = getDecodedUser(req.headers.authorization)
        bandService.getSingleBand(dataSet, req.params.bandid, username, resp => res.json(resp))
    })

    //Create a band
    router.post("/createband/", (req, res) => {
        let username = getDecodedUser(req.headers.authorization)
        let band = req.body
        band.bandBy = username
        bandService.createBand(dataSet, band, resp => res.json(resp))
    })

    //Update band
    router.put("/updateband/:bandid", (req, res) => {
        let username = getDecodedUser(req.headers.authorization)
        let band = req.body
        bandService.updateBand(dataSet, req.params.bandid, username, band, resp => res.json(resp))
    })

    //Delete band
    router.delete("/deleteband/:bandid", (req, res) => {
        let username = getDecodedUser(req.headers.authorization)
        bandService.deleteBand(dataSet, req.params.bandid, username, resp => res.json(resp))
    })
}

function setDataset(dataSet, callback) {
    callbackAPIs(dataSet)
    callback(router)
}

module.exports = {
    setDataset
}