// function download(callback) {
//   setTimeout(function () {
//     console.log("Done")
//     callback()
//   }, 1000)
// }

// download(function () {
//   console.log("First")
// })
// Download  -> resize -> Upload

// function coffee(type) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve("Vanilla Latte")
//     }, 2000)
//   })
// }

const p = coffee("Latte")

async function start() {
  try {
    await p
    await new Promise(function (resolve, reject) {
      setTimeout(reject, 1000)
    })
  } catch (err) {
    console.log("error happened")
  }
    
  console.log("Got Coffee")
}

// start()

const x = async (a, b) => a + b

console.log(x(2,3))