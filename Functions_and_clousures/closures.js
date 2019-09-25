function f(a) {
  const x = function () {
    return a++
  }
  return x
}

const fn = f(1)

console.log(fn()) // 1
console.log(fn()) // 2
console.log(fn()) // 3

console.log(f(1)()) // 1
console.log(f(1)()) // 1
console.log(f(1)()) // 1

var funcs = [];
// let's create 3 functions
for (var i = 0; i < 3; i++) {
  // and store them in funcs
  // IIFE
  funcs[i] = (function (i) {
    return function() {
      // each should log its value.
      console.log("My value: " + i);
    };
  })(i)
}

funcs[0]() // 0
funcs[1]() // 1
funcs[2]() // 2
// console.log(i) // 3