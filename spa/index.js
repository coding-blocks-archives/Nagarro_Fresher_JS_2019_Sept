let todos = [
  {
    id: 1,
    name: "Teach Class at Nagarro",
    done: true,
    deadline : new Date()
  },
  {
    id: 2,
    name: "Get Coffee",
    done: false,
    deadline: new Date()
  }
];


let id = todos.length + 1;


function render(state) {
    let length = todos.length
  return state
      .map(
        (todo, index) => {

          const strikeString = todo.done ? 'striked' : ''
          const upArrow = index == 0 ? '-' : 'fa-arrow-up'
          const upButtonClass = index == 0 ? '' : 'go-up'
          const downArrow = index == length - 1 ? '-s' : 'fa-arrow-down'
          const downButtonClass = index == length - 1 ? '' : 'go-down'

          const row = document.createElement('tr')
          row.setAttribute('data-todoId', todo.id)
          

          const name = document.createElement('td')
          name.setAttribute('class', strikeString+" strikable")
          name.innerText = todo.name

          const deadlineDate = document.createElement('td')
          deadlineDate.setAttribute('class', strikeString)
          deadlineDate.innerText = (todo.deadline.getMonth() + 1) + "/" + todo.deadline.getDate() + "/"+(todo.deadline.getYear()+1900)
          
          

          const up = document.createElement('button')
          up.setAttribute('type', 'button')
          up.setAttribute('class', 'btn btn-info ' + upButtonClass)
          const upIcon = document.createElement('i')
          upIcon.setAttribute('class', 'fa ' + upArrow)
		  upIcon.text = "⬆"
          up.appendChild(upIcon)


          const down = document.createElement('button')
          down.setAttribute('type', 'button')
          down.setAttribute('class', 'btn btn-info ' + downButtonClass)
          const downIcon = document.createElement('i')
          downIcon.setAttribute('class', 'fa ' + downArrow)
		  downIcon.text = '⬇'
          down.appendChild(downIcon)

          const operations = document.createElement('td')
          operations.appendChild(up)
          operations.appendChild(down)

          row.appendChild(name)
          row.appendChild(deadlineDate)
          row.appendChild(operations)

         
          return row.outerHTML;
         
    })
    .join("");
}


function paint() {
    $("tbody").html(render(todos));

    $('.strikable').click(function () {

        let strikeId = this.parentElement.dataset.todoid
        todos.forEach(function (todo) {
            if (todo.id == strikeId) { todo.done = !todo.done }
        })
        paint()
    }
    )

    $('.go-down').on('click', function () {
        let clickedId = this.parentElement.parentElement.dataset.todoid
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == clickedId) {
                let temp = todos[i]
                todos[i] = todos[i + 1]
                todos[i + 1] = temp
                break
            }
        }
        paint()
    })

    $('.go-up').on('click', function () {
        let clickedId = this.parentElement.parentElement.dataset.todoid
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == clickedId) {
                let temp = todos[i]
                todos[i] = todos[i - 1]
                todos[i - 1] = temp
                break
            }
        }
        paint()
    })
   
}


$('#sort').on('click', function () {
    todos.sort(function (a, b) {
        return a.deadline - b.deadline
    })
    paint()
})

function addTodo() {
    const inputBox = $('#newTodo')
    const deadline = $('#deadline')
    todos.push({
        id: id++,
        name: inputBox.val(),
        done: false,
        deadline: new Date(deadline.val())
    })
    inputBox.val('')
    deadline.val("2019-11-01")
    paint()
}



function removeTodos() {
  todos = todos.filter(todo => !todo.done)
  paint()
}


// Modifications are done here
function reset() {
  todos = [];
  paint();
}



$('ul').on("click", function (e) {
  const idToFind = e.target.dataset.todo
  const todo = todos.find(todo => todo.id == idToFind)
  todo.done = !todo.done
  paint()
})

$('#newTodo').on("keypress", function (e) {
  if (e.which == 13) {
    addTodo()
  }
})

paint();
