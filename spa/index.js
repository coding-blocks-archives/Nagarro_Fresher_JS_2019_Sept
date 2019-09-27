const todos = [
  {
    id: 1,
    name: "Teach Class at Nagarro",
    done: true
  },
  {
    id: 2,
    name: "Get Coffee",
    done: false
  }
];

function render(state) {
  return state
    .map(todo => {
      const classString = todo.done ? `class = "striked"` : ''
      return `<li data-todo="${todo.id}" ${classString}> ${todo.name} </li>`;
    })
    .join("");
}

function paint() {
  $("ul").html(render(todos));
}

function addTodo() {
  // document.getElementById('newTodo') != $('#newTodo')
  const inputBox = $('#newTodo')
  todos.push({
    id: todos.length + 1,
    name: inputBox.val(),
    done: false
  })

  inputBox.val('')

  paint()
}


$('ul').on("click", function (e) {
  const idToFind = e.target.dataset.todo
  const todo = todos.find(todo => todo.id == idToFind)
  todo.done = !todo.done

  paint()
})





paint();
