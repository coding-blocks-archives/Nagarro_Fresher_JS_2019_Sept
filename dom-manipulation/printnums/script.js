let num = document.getElementById('num')
let btn = document.getElementById('btn')
let list = document.getElementById('list')

btn.onclick = function () {
  let start = new Date().getTime()

  let N = parseInt(num.value)

  for (let i = 1; i <= N; i++) {
    let item = document.createElement('li')
    item.innerText = i
    list.appendChild(item)
  }

  let end = new Date().getTime()

  console.log(end - start)
}
