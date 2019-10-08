/**
 * @author : akshatjain
 */
//Get the User info...

function getUser(User, username, callback) {
    User.findByPk(username)
        .then(user => {
            callback(user.get({
                plain: true
            }))
        })
        .catch(err => {
            callback({
                msg: 'User Not Found',
                reason: err
            })
        })
}

//Create User in DB...

function createUser(User, user, callback) {
    getUser(User, user.username, (resp) => {
        if (resp.msg === 'User Not Found') {
            User.build(user).save()
                .then(user => {
                    callback({
                        msg: 'Sign Up Successfully',
                        reason: {
                            username: user.username
                        }
                    })
                })
                .catch(err => {
                    callback({
                        msg: 'Error in Sign UP User',
                        reason: err
                    })
                })
        } else {
            callback({
                msg: 'Username Already Exsists'
            })
        }
    })
}


module.exports = {
    getUser,
    createUser
}