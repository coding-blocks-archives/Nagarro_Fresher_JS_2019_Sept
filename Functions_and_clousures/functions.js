// const a = { // 0x 0125
//   c: 2
// }

// a = { // Error
//   c: 2
// }

// console.log(a.c)


function fn() {
  var a = 2
  if (a == 2) {
    // var b = 4
    let b = 4
  }

  console.log(b) //  4
}

fn()

// console.log(b) // Error