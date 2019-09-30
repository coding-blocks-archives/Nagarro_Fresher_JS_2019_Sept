let todos = [
  {
    id: 1,
    name: "Teach Class at Nagarro",
    done: true,
    deadline:new Date()
  },
  {
    id: 2,
    name: "Get Coffee",
    done: false,
    deadline:new Date()
  }
];

function render(state) {
  return state
    .map(todo => {
      // const li = document.createElement('li')
      // li.classList.add("striked")
      // document.body.append(li)
      const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
      return `<li data-todo="${todo.id}" ${classString}> ${todo.name} </li>`;
    })
    .join("");
}

function paint() {
  $("ul").html(render(todos));
}

function addTodo() {
  // document.getElementById('newTodo') != $('#newTodo')
  const dateVal=$('#deadline')
  const inputBox = $('#newTodo')
  todos.push({
    id: todos.length + 1,
    name: inputBox.val(),
    done: false,
    deadline:new Date(dateVal.val())
  })

  inputBox.val('')

  paint()
}
function sortToDos(){
  
  todos.sort(function(a,b){
   
    return a.deadline-b.deadline
  })
  paint()
}



function removeTodos() {
  todos = todos.filter(todo => !todo.done)

  paint()
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
