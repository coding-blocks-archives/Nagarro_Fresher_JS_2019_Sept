// function declartion
function sum(a, b) {
  return a+b
}

const a = (5 - 3)

// function expression
const subtract = function (a, b) {
  return a-b
}

console.log(subtract(5, 3)) // 2
console.log(sum(2, 3)) // 5


const add = function (a) {
  return function (b) {
    return a + b
  }
}

const add2 = add(2)

console.log(add2(5)) // 7
console.log(add2(10)) // 12
console.log(add2(15)) // 17

// console.log(fn(2)(3)) // 5
