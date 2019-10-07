var express = require("express")

var router = express.Router()

router.use( (req, res, next) => {
    res.status(404).render('404', {
        pageurl: req.url
    })
})

module.exports = {router}