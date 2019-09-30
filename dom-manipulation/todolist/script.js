let newtask = document.getElementById('newtask')
let addtask = document.getElementById('addtask')
let tasklist = document.getElementById('tasklist')

addtask.onclick = function () {

  let newitem = document.createElement('li')
  newitem.innerText = newtask.value
  tasklist.appendChild(newitem)
}
