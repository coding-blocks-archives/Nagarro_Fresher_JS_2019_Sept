let todos = [
  {
      id: 1,
      name: 'Teach class at Nagarro',
      done: true,
      deadline: "2019-09-20"
  },
  {
      id: 2,
      name: 'Get Coffee',
      done: false,
      deadline: "2019-09-10"
  }

];

function render(state) {
  return state
      .map(todo => {
          const classString = todo.done ? `list-group-item striked` : `list-group-item`
          return `<li data-todo="${todo.id}" class = "draggable ${classString}" draggable="true"> ${todo.name} <span style="float: right"> ${todo.deadline} </span></li>`;
          
      })

      .join("");
}


function paint() {
  $("ul").html(render(todos));
}


function addTodo() {
  const inputBox = $('#newTodo')
  const inputDate = $('#newDate')
  todos.push({
      id: todos.length + 1,
      name: inputBox.val(),
      done: false,
      deadline: inputDate.val()
  })

  inputBox.val('')
  inputDate.val('')

  paint()
}

function removeTodos() {
  todos = todos.filter(todo => !todo.done)

  paint();
}



function sortTodos() {

  todos.sort(function (a, b) {
      return (new Date(a.deadline)) - (new Date(b.deadline))
  });
  paint()
}



$("#sortable").sortable({
  update: function (event, ui) {
      let temp = [];
      var idsInOrder = $("#sortable").sortable().toArray();

      children = idsInOrder[0].children;
      for (var i = 0; i < children.length; i++) {
          temp[i] = todos.find(todo => todo.id == children[i].attributes['0'].value)
      }
      todos = temp;
  }
});


function resetBox() {
  const inputBox = $('#newTodo')
  const inputDate = $('#newDate')
  inputBox.val('')
  inputDate.val('')
}

$('ul').on("click", function (e) {
  const idToFind = e.target.dataset.todo
  const todo = todos.find(todo => todo.id == idToFind)
  todo.done = !todo.done

  paint()
})


$('#newTodo').on("keypress", function (e) {
  if (e.which == 13) {
      addTodo();
  }
})


paint();
