// function sum(a, b) {
//   return a+b
// }

// const add = function () {
//   return a+ b
// }

// Lexical This
const addL = (a, b) => a + b



// console.log(this)
const obj = {
  a: 2,
  sayIt: () => console.log(this)
}

obj.sayIt()

// (function () {
//   console.log(this)
// })()

