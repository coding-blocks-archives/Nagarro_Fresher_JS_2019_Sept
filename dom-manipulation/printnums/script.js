let num = document.getElementById('num')
let btn = document.getElementById('btn')
let list = document.getElementById('list')

btn.onclick = function () {

  let N = parseInt(num.value)

  for (let i = 1; i <= N; i++) {
    list.innerHTML += '<li>' + i + '</li>'
  }

}
