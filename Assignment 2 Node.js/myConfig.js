const express = require('express');
module.exports = {
    mysql: require('mysql'),
    exphbs: require('express-handlebars'),
    bodyparser: require('body-parser'),
    session: require('express-session'),
    app: express(),
    express: express
};