let todos = [
  ];
  $('ul').sortable();
  
  function render(state) {
    
    
    return state
      .map(todo => {
        const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
        return `<li data-todo="${todo.id}" ${classString}  style="background-color: lightblue;"> <b>${todo.name}</b>    
        <span style="float: right ;">🗓<b>${todo.deadline}</b></span>
        </li>
        `  ;
      })
      .join("");
  }
  
  function paint() {
    $("ul").html(render(todos));
  }
  
  
  
  function addTodo() {
    const newDateBox=$('#newTodoDate')
    const inputBox = $('#newTodo')
    if(inputBox.val() == '' || newDateBox.val() == '')
    return;
    
    todos.push({
      id: todos.length + 1,
      name: inputBox.val(),
      done: false,
      deadline:newDateBox.val()
    })
  
    inputBox.val('')
    newDateBox.val('')
  
    paint()
  }
  
  
  
  function removeTodos() {
    todos = todos.filter(todo => !todo.done)
  
    paint()
  }
  function sortTodos(){
    todos.sort((a, b)=> {
        var dateA = new Date(a.deadline);
        var dateB = new Date(b.deadline);
        return dateA - dateB;
      })
  }
 
  
  
  $('ul').on("click", function (e) {
    const idToFind = e.target.dataset.todo
    
    const todo = todos.find(todo => todo.id == idToFind)
    
    if (todo!==undefined) {
    todo.done = !todo.done
    }
    paint()
  });
  
  
  $('#newTodo').on("keypress", function (e) {
    if (e.which == 13) {
      addTodo()
    }
  })
  $('#newTodoDate').on("keypress", function (e) {
    if (e.which == 13) {
      addTodo()
    }
  })
  
  
  $('#sort').click(()=>{
    sortTodos();
    paint();
});

  
  $('#reset').click(()=>{
    $('#newTodo').val('')
    $('#newTodoDate').val('')
  })
  
  paint();
