let todos = [
  {
      id: 1,
      name: "Teach Class at Nagarro",
      done: true,
      deadline: new Date(2019, 11, 24)
  },
  {
      id: 2,
      name: "Get Coffee",
      done: false,
      deadline: new Date(2019, 10, 11)
  }
];


function render(state) {
  return state
      .map(todo => {
          // const li = document.createElement('li')
          // li.classList.add("striked")
          // document.body.append(li)
          const classString = todo.done ? `class = "draggable list-group-item striked"` : `class = "draggable list-group-item"`
          return `<li data-todo="${todo.id}" ${classString} draggable="true"> ${todo.name} <span style="float: right">${todo.deadline}</span> </li>`;
      })
      .join("");
}


function paint() {
  $("ul").html(render(todos));
}

function addTodo() {
  // document.getElementById('newTodo') != $('#newTodo')
  const inputBox = $('#newTodo')
  const deadlinedate = $('#todoDeadline')
  todos.push({
      id: todos[todos.length - 1].id + 1,
      name: inputBox.val(),
      done: false,
      deadline: new Date(deadlinedate.val())
  })

  inputBox.val('')
  deadlinedate.val('')

  paint()
}

function removeTodos() {
  todos = todos.filter(todo => !todo.done)

  paint()
}

function sortByDeadline() {
  todos.sort(function (a, b) {
      return (new Date(a.deadline) - new Date(b.deadline))
  });

  paint()
}

function reset() {
  $("#newTodo").val('');
  $("#todoDeadline").val('');
}

$('ul').on("click", function (e) {
  const idToFind = e.target.dataset.todo
  const todo = todos.find(todo => todo.id == idToFind)
  todo.done = !todo.done

  paint()
})

$('#newTodo, #todoDeadline').on("keypress", function (e) {
  if (e.which == 13) {
      addTodo()
  }
})



$("#sortable").sortable({
    update: function (event, ui) {
      let temp = [];
      var idsInOrder = $("#sortable").sortable().toArray();
  
      children = idsInOrder[0].children;
      for (var i = 0; i < children.length; i++) {
        temp[i] = todos.find(todo => todo.id == children[i].attributes['0'].value)
      }
      todos = temp;
    }
  }); 

paint();
