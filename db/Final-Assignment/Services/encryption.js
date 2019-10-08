/**
 * @author : akshatjain
 */

//Get Decoded User API...

function getDecodedUser(enc) {
    let username = enc;
    for (let i = 0; i <= 3; i++) {
        username = Buffer.from(username, 'base64').toString('ascii')
    }
    return username
}

//Get Encoded User API...

function getEncodedUser(plain) {
    var username = plain;
    for (let i = 0; i <= 3; i++) {
        username = Buffer.from(username).toString('base64')
    }
    return username
}

module.exports = {
    getDecodedUser,
    getEncodedUser
}