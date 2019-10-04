const fs = require('fs')



function readFile(fileName, done) {
  fs.readFile(__dirname + '/' + fileName, 'utf-8', done)
}

function writeFile(fileName, datatoWrite, done) {
  fs.writeFile(__dirname + '/' + fileName, datatoWrite,  done)
}

function performComputationSum(result) {
  let arr = result.split('\n')
  let sum = 0;
  arr.forEach((ele) => {
    sum += Number(ele.replace(/[\r\n]+/gm, ""))
  })
  return sum
}

readFile("numbers.txt", (err, result) => {
  let sum = performComputationSum(result)
  writeFile("answer.txt", sum, (err, result) => {
    console.log("Done Saved Sum:"+sum )
  })
})


//  Homework: Covert to promises

// readFile('numbers.txt').then(data => {
//   const dataToWrite = performOps(data)
//   return writeFile('result.txt', dataToWrite)
// }).then(() => {
//   console.log("Done")
// })