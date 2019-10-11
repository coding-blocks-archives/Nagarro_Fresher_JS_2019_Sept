const User = require('./Sequelize.js').User;
const Band = require('./Sequelize.js').Band;
module.exports = {
    editBands: function (req, res) {
        Band.findOne({
            where: { id: req.params.id }
        }).then(
            bands => {
                var band = {
                    id: bands.id,
                    bandname: bands.bandname,
                    description: bands.description,
                    number_of_members: bands.number_of_members
                };
                res.render("edit", {
                    band: band
                })
            }
        )
    },

    editBand: function (req, res, id, bandname, description, no_of_members) {
        Band.findOne({
            where: { id: id }
        }).then(
            band => {
                band.update({
                    bandname: bandname,
                    description: description,
                    number_of_members: no_of_members
                }).then(setTimeout(function () {
                    Band.findAll({ where: { userUserId: req.session.userid } }).then(
                        bands => {
                            req.session.band = bands;
                            res.redirect("/");
                        }
                    )
                }, 1000))
            }
        );
    },

    deleteBands: function (req, res, bid) {
        Band.destroy({
            where: { id: bid }
        }).then(
            Band.findAll({ where: { userUserId: req.session.userid } }).then(
                bands => {
                    req.session.band = bands;
                    res.redirect("/");
                }
            )
        )
    },

    authUser: function (req, res, username, password) {
        User.findOne({
            where: { username: username, upassword: password }
        }).then(
            user => {
                if (user) {
                    req.session.user = username;
                    req.session.userid = user.user_id;
                }
                else {
                    req.session.LoginFailureStatus = "No User exist :(";
                }
                res.redirect("/");
            }
        );
    },

    addBands: function (req, res, bandname, description, no_of_members) {
        Band.create({
            bandname: bandname,
            description: description,
            number_of_members: no_of_members,
            userUserId: req.session.userid
        }).then(setTimeout(function () {
            Band.findAll({ where: { userUserId: req.session.userid } }).then(
                bands => {
                    req.session.band = bands;
                    res.redirect("/");
                }
            )
        }, 1000)
        );
    },

    addUser: function (req, res, username, password) {
        User.create({
            username: username,
            upassword: password
        }).then(
            req.session.SighnupSuccessStatus = "Account Create Successfully",
            res.redirect("/")
        );
    },

    logout: function (req, res) {
        req.session.destroy();
        res.redirect("/");
    }
}     