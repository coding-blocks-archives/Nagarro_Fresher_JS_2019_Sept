const mysqlConnection = require('./mysqlConnection.js').mysqlConnection;

module.exports = {
    getBands: function (req, res) {
        username = req.session.user;
        mysqlConnection.query('SELECT * FROM BAND WHERE USERID = (SELECT id FROM USER where username = ?)', [username], (err, rows, field) => {
            if (!err) {
                req.session.band = rows;
                res.redirect("/");
            }
            else
                console.log(err);
        });
    },

    editBands: function (req, res, id){
        mysqlConnection.query("SELECT * FROM BAND WHERE ID = ?", [id], (err, rows, field) => {
            var band = {
                id: rows[0].id,
                bandname: rows[0].bandname,
                description: rows[0].description,
                number_of_members: rows[0].number_of_members
            };
            res.render("edit", {
                band: band
            })
        })
    },

    updateBands: function(req, res, bandname, description, number_of_members, id){
        mysqlConnection.query("UPDATE BAND SET BANDNAME = ?, DESCRIPTION = ?, NUMBER_OF_MEMBERS = ? WHERE ID = ?", [bandname, description, number_of_members, id], (err, rows, field) => {
            if (!err) {
                this.getBands(req, res);
            }
            else {
                console.log(err);
            }
        })
    },

    deleteBands: function(req, res, id){
        mysqlConnection.query("DELETE FROM BAND WHERE ID = ?", [id], (err, field) => {
            if (!err)
                this.getBands(req, res);
            else
                console.log(err);
        })
    },

    addBands: function(req, res, bandname, description, no_of_members, username){
        mysqlConnection.query("INSERT INTO BAND (BANDNAME, USERID, DESCRIPTION, NUMBER_OF_MEMBERS) VALUES (?, (SELECT ID FROM USER WHERE USERNAME = ?), ?, ?)", [bandname, username, description, no_of_members], (err, field) => {
            if (!err)
                this.getBands(req, res);
            else
                console.log(err);
        })
    },

    authUser: function(req, res, username, password){
        mysqlConnection.query("SELECT * FROM USER WHERE USERNAME = ? AND UPASSWORD = ?",[username, password], (err,rows, field) => {
            if(!err){
                req.session.user = username;
                this.getBands(req, res);
            }
            else{
                console.log(err);
            }
        });  
    },

    addUser: function(req, res, username, password){
        mysqlConnection.query("INSERT INTO USER (USERNAME, UPASSWORD) VALUES( ?, ?)",[username, password], (err, field) => {
            if(!err){
                req.session.user = username;
                this.getBands(req, res);
            }
            else{
                console.log(err);
            }
        });  
    },

    logout: function(req, res){
        req.session.destroy();
        res.redirect("/");
    }
}