const mysqlConnection = require('./mysqlConnection.js').mysqlConnection;

module.exports = {
    getBands: function (req, res) {
        username = req.session.user;
        mysqlConnection.query('SELECT * FROM BAND WHERE USERID = (SELECT id FROM USER where username = ?)', [username], (err, rows, field) => {
            if (!err) {
                req.session.band = rows;
                
            }
            else
                console.log(err);
            res.redirect("/");
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
        mysqlConnection.query("UPDATE BAND SET BANDNAME = ?, DESCRIPTION = ?, NUMBER_OF_MEMBERS = ? WHERE ID = ? AND USERID = ?", [bandname, description, number_of_members, id, req.session.userid], (err, rows, field) => {
            if (!err) {
                this.getBands(req, res);
            }
            else {
                console.log(err);
            }
        })
    },

    deleteBands: function(req, res, id){
        mysqlConnection.query("DELETE FROM BAND WHERE ID = ? AND USERID = ?", [id, req.session.userid], (err, field) => {
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
        console.log(password);
        mysqlConnection.query("SELECT * FROM USER WHERE USERNAME = ? AND UPASSWORD = ?",[username, password], (err,rows, field) => {
            if(!err){
                if(rows.length!=0){
                    req.session.user = username;
                    req.session.userid = rows[0].id;
                }
                else
                    req.session.LoginFailureStatus = "No User exist :(";               
            }
            else{
                req.session.LoginFailureStatus = err;
            }
            req.session.SighnupSuccessStatus = '';
            req.session.SighnupFailureStatus = '';
            this.getBands(req, res);
        });  
    },

    addUser: function(req, res, username, password){
        mysqlConnection.query("INSERT INTO USER (USERNAME, UPASSWORD) VALUES( ?, ?)",[username, password], (err, field) => {
            if(!err){
                req.session.SighnupSuccessStatus = "Account Create Successfully";   
                req.session.SighnupFailureStatus = '';
            }
            else{
                req.session.SighnupSuccessStatus = '';
                req.session.SighnupFailureStatus = err.sqlMessage;
            }
            req.session.LoginFailureStatus = '';
            res.redirect("/");
        });  
    },

    logout: function(req, res){
        req.session.destroy();
        res.redirect("/");
    }
}