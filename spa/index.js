let todos = [
    {
      id: 1,
      name: "Complete The Budget App",
      done: false,
      deadline: new Date(2019, 11, 24)
    },
    {
      id: 2,
      name: "Fork Github Repository",
      done: false,
      deadline: new Date(2019, 10, 11)
    }

    {
      id: 3,
      name: "Implement Data Structures in java",
      done: false,
      deadline: new Date(2019, 10, 11)
    }
  ];
  
  function render(state) {
    return state
      .map(todo => {
        const classString = todo.done ? `list-group-item striked` : `list-group-item`
        return `<li data-todo="${todo.id}" class="draggable ${classString}" draggable="true"> ${todo.name} <span style="float: right">${todo.deadline}</span></li>`;
      })
      .join("");
  }
  
  
  function paint() {
    $("ul").html(render(todos));
  }
  
  function addTodo() {
    // document.getElementById('newTodo') != $('#newTodo')
    const inputBox = $('#newTodo')
    const deadlinedate = $('#newTododate')
    todos.push({
      id: todos.length + 1,
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
  
  function sortTodos() {
    todos.sort(function (a, b) {
      return (new Date(a.deadline) - new Date(b.deadline))
    });
  
    paint()
  }
  
  
  $("#sortable").sortable(function(){
    
  });
  
  function reset() {
    $("#newTodo").val('');
    $("#newTododate").val('');
  }
  
  $('ul').on("click", function (e) {
    const idToFind = e.target.dataset.todo
    const todo = todos.find(todo => todo.id == idToFind)
    todo.done = !todo.done
  
    paint()
  })
  
  $('#newTodo, #newTododate').on("keypress", function (e) {
    if (e.which == 13) {
      addTodo()
    }
  })
  
  
  paint();