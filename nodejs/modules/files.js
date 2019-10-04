const fs = require('fs')

function readFile(filename, done) {
  fs.readFile(__dirname + '/' + filename, 'utf-8', (err, data) => {
    done(data)
  })
}

function writeFile(filename, data, done) {
  fs.writeFile(__dirname + '/' + filename, data, (err, results) => done())
}

function performOps(data) {
  return data.split('\n').reduce((acc, el) => acc + +el, 0)
}

readFile('numbers.txt', data => {
  const dataToWrite = performOps(data)
  writeFile('result.txt', dataToWrite, () => {
    console.log("Done")
  })
})


//  Homework: Covert to promises

// readFile('numbers.txt').then(data => {
//   const dataToWrite = performOps(data)
//   return writeFile('result.txt', dataToWrite)
// }).then(() => {
//   console.log("Done")
// })
