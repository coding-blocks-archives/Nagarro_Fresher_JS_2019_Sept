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

function coffee(type) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Vanilla Latte")
    }, 2000)
  })
}

const p = coffee("Latte")

// p.then().then()
p.then(function (coffee) {
  console.log("Drank ", coffee)
  // throw new Error("Spilled My Drink")
  return new Promise(function (resolve, reject) {
    setTimeout(reject, 1000)
  })
}).catch(function (err) {
  console.log("Buy a new T Shirt")
}).then(function () {
  console.log("Finally go to work")
}).then(function () {
  throw new Error("Car broke down :(")
}).then(function () {
  console.log("doing work")
}).catch(function (err) {
  console.log("Catched: ", err)
})

// console.log("First")

