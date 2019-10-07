const fs = require('fs')

const math = require('./math.js')

console.log(math.sum(1,2))

// console.log(__dirname)
const contents = fs.readFileSync(__dirname + '/numbers.txt', 'utf-8')

console.log(contents.split('\n'))
// var sum=0
// for(let i=0;i<contents.length;i++){
// sum=math(sum,contents[i])
// }
// console.log(sum)
// console.log(contents.split('\n'))