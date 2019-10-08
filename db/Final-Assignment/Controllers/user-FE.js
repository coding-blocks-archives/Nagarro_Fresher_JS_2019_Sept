/**
 * @author : akshatjain
 */
var express = require("express")
var userService = require("../Services/user-service")
var encryption = require("../Services/encryption")

var router = express.Router()

let {
    getEncodedUser
} = encryption

const loggedInOnly = (failure = "/login") => (req, res, next) => {
    if (req.session.user)
        next()
    else
        res.redirect(failure)
}

// router.use(loggedInOnly())

router.get("/", loggedInOnly(), (req, res) => {
    res.redirect("/dashboard")
})

//Login/Registration Static Pages...
router.get('/login', (req, res) => {
    if (req.session.user)
        res.redirect("/dashboard")
    else
        res.render('login', {
            error: ""
        })
})
router.get('/register', (req, res) => {
    if (req.session.user)
        res.redirect("/dashboard")
    else
        res.render('register', {
            error: ""
        })
})

//Logout 
router.get('/logout', (req, res) => {
    req.session.user = null
    res.clearCookie('username_jwt')
    res.redirect("/login")
})

//User Dashboard...
router.get('/dashboard', loggedInOnly(), (req, res) => {
    username = req.session.user.username
    res.cookie('username_jwt', getEncodedUser(username))
    res.render('dashboard', {
        username: username
    })
})

function datasetAPIs(UserDataSet) {
    //Login User Post Method...
    router.post('/login', (req, res) => {
        let {
            username,
            password
        } = req.body

        validateLengths(username, password, 'login', res)

        signInUser(UserDataSet, username, password, req, res)
    })

    //Register/Signup User...
    router.post('/register', (req, res) => {
        let {
            username,
            password,
            cpassword
        } = req.body

        validateLengths(username, password, 'register', res)

        if (password !== cpassword) {
            renderError(res, 'register', 'Passwords Does Not Matched With Each Other')
        }

        let user = {
            username,
            password
        }
        signupUser(UserDataSet, user, req, res)
    })
}

function signInUser(User, username, password, req, res) {
    userService.getUser(User, username, user => {
        if (user.msg) {
            renderError(res, 'login', user.msg)
        } else {
            //User Recieved
            if (user.password == password) {
                req.session.user = {
                    username: username
                }
                res.redirect("/")
            } else {
                renderError(res, 'login', 'Invalid Password !!!')
            }
        }
    })
}

function signupUser(User, user, req, res) {
    userService.createUser(User, user, resp => {
        if (resp.msg == 'Sign Up Successfully') {
            req.session.user = {
                username: resp.reason.username
            }
            res.redirect("/")
        } else {
            renderError(res, 'register', resp.msg)
        }
    })
}

function validateLengths(username, password, url, res) {
    if (username.trim().length <= 0 || password.trim().length <= 0) {
        renderError(res, url, 'Username/Password Cannot Be Blank')
    }
}

function renderError(res, page, msg) {
    res.render(page, {
        error: msg
    })
}

function setDataSet(dataSet, callback) {
    datasetAPIs(dataSet)
    callback(router)
}

module.exports = {
    setDataSet
}