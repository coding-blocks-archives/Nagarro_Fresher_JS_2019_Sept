const myConfig = require('./myConfig.js');
const functions = require('./functions.js');
const app = myConfig.app;
const exphbs = myConfig.exphbs;
const session = myConfig.session;
const bodyparser = myConfig.bodyparser;
const port = process.env.PORT || 8080;
const methodOverride = require('method-override');
const crypto = require('crypto');
app.engine('hbs', exphbs({
    defaultLayout: '',
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

// app.use(session({
//     secret: "nobody should guess this",
//     saveUninitialized: true,
//     cookie: { secure: process.env.NODE_ENV == "production" ? true : false ,
//     maxAge: 1000 * 60 * 60 * 24 * 7 }
// }));

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
    functions.editBands(req, res, req.params.id);
});

app.post("/editband/:id", (req, res) => {
    const { bandname, description, no_of_members } = req.body;
    const id = req.params.id;
    functions.updateBands(req, res, bandname, description, no_of_members, id);
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    functions.deleteBands(req, res, id);
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.render("login", {
            signupSuccessStatus: req.session.SighnupSuccessStatus,
            signupFailureStatus: req.session.SighnupFailureStatus,
            loginFailureStatus: req.session.LoginFailureStatus
        });
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = crypto.createHash('sha256').update(req.body.password).digest('base64');
    functions.authUser(req, res, username, password);
});

app.get("/add", (req, res) => {
    res.render("addBand");
});

app.post("/add", (req, res) => {
    const { bandname, description, no_of_members } = req.body;
    const username = req.session.user;
    functions.addBands(req, res, bandname, description, no_of_members, username);
});

app.get("/logout", (req, res) => {
    functions.logout(req, res);
});

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = crypto.createHash('sha256').update(req.body.password).digest('base64');
    functions.addUser(req, res, username, password);
})