const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({
  secret: 'nobody should guess this',
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res) => {
  req.session.count = req.session.count || 0
  req.session.count++
  res.send(`You saw this ${req.session.count} times`)
})

app.listen('8080', function () {
  console.log("Running on 8080")
})