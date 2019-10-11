const functions = require('./functions.js');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyparser = require('body-parser');

const app = express();

const port = process.env.PORT || 8080;
const methodOverride = require('method-override');
const crypto = require('crypto');
app.engine('hbs', exphbs({
    defaultLayout: '',
}));



app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(session({
    secret: "nobody should guess this",
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.listen(port, () => console.log(`Listening on port ${port}..`));

const loggedInOnly = (failure = "/login") => (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect(failure);
    }
};

app.get("/", loggedInOnly(), (req, res) => {
    res.render("index", {
        bands: req.session.band
    })
});

app.put("/edit/:id", (req, res) => {
    functions.editBands(req, res);
});

app.post("/editband/:id", (req, res) => {
    const { bandname, description, no_of_members } = req.body;
    const id = req.params.id;
    functions.editBand(req, res, id, bandname, description, no_of_members);
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    functions.deleteBands(req, res, id);
});

app.post("/forgotpassword", (req, res) => {
    const email = req.body.useremail;
    functions.forgotpassword(req, res, email);
})

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.render("login", {
            signupSuccessStatus: req.session.SighnupSuccessStatus,
            signupFailureStatus: req.session.SighnupFailureStatus,
            loginFailureStatus: req.session.LoginFailureStatus,
            login: "block",
            forgot: "none",
            new: "none"
        });
    }
});

app.post("/login", (req, res) => {
    const useremail = req.body.useremail;
    const password = crypto.createHash('sha256').update(req.body.password).digest('base64');

    functions.authUser(req, res, useremail, password);
});

app.get("/add", (req, res) => {
    res.render("addBand");
});

app.post("/add", (req, res) => {
    const { bandname, description, no_of_members } = req.body;
    functions.addBands(req, res, bandname, description, no_of_members);
});

app.get("/logout", (req, res) => {
    functions.logout(req, res);
});

app.post("/signup", (req, res) => {
    const { username, password, useremail, userdob } = req.body;
    functions.addUser(req, res, username, crypto.createHash('sha256').update(password).digest('base64'), useremail, userdob);
});

app.post("/newpassword", (req, res) => {
    const { userotp, newpassword } = req.body;
    const email = req.session.useremail;
    functions.newpassword(req, res, email, userotp, crypto.createHash('sha256').update(newpassword).digest('base64'));
})