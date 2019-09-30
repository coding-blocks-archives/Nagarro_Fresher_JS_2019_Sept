const fs = require('fs')

const contents = fs.readFile(__dirname + '/numbers.txt', 'utf-8', function (err, result) {
  console.log(result)
})


console.log(contents.split('\n'))