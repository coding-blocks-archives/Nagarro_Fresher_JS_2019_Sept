const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");

app.set("view engine", "hbs");

app.use(
  session({
    // use redis/mongodb/postgres store
    secret: "nobody should guess this",
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

const loggedInOnly = (failure = "/login") => (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect(failure);
  }
};

app.get("/", loggedInOnly() ,(req, res) => {
  res.render("index", {
    name: req.session.user.username
  })
})

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Make this comparision in DB
  if (username == "abhishek" && password == "cb") {
    req.session.user = {
      id: 1,
      username: "Abhishek",
      about: "mentor, developer and reader"
    };

    res.redirect("/");
  } else {
    res.sendStatus(401);
  }
});

app.listen(8080);
