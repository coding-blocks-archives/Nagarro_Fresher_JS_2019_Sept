const express = require('express')

const app = express()

app.use(function (req, res, next) {
  console.log("At Middleware 1")
  next()
})


/// Request was for /a/b/c/d
// This will also match because prefix match
app.use('/a', function (req, res, next) {
  console.log("Middleware /a")
  next()
})

app.use('/a/b', function (req, res, next) {
  console.log("Middleware /a/b")
  next()
})

// will this match /a/b ?
app.get('/a', function (req, res) {
  console.log("GET /a")
})

app.get('/a/b', function (req, res, next) {
  console.log("GET /a/b")
})

// Middleware
app.get('/', (req, res, next) => {
  console.log("At GET /")
  res.send('Hello from Server Side')
})


app.listen(8080, function () {
  console.log("Running on 8080")
})