function createGreeter(greeting) {

  function greet(name) {
    console.log(greeting + ' ' + name)
  }

  return greet
}

let gm = createGreeter('Good Morning')
let ge = createGreeter('Good Evening')

function run (runner) {
  if (typeof runner === 'function') {
    runner()
  } else {
    console.log("cannot run unless a function is passed")
  }
}

function hello() {
  console.log('Hello')
}

