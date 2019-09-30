
let todos = [
    {
      id: 1,
      name: "Teach Class at Nagarro",
      done: true,
      date: "2016-12-02"
    },
    {
      id: 2,
      name: "Get Coffee",
      done: false,
      date: "2016-11-01"
    }
  ];
  
  function render(state) {
    return state
      .map(todo => {
        const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
        return `<li data-todo="${todo.id}" ${classString}> ${todo.name} <span style="float:right;">🗓${todo.date}</span>

        </li>`;
      })
      .join("");
  }
  
  function paint() {
    $("ul").html(render(todos));
  }
  const inputDate = $('#newDate')
  function addTodo() {
    const inputBox = $('#newTodo')
    todos.push({
      id: todos.length + 1,
      name: inputBox.val(),
      done: false,
      date:inputDate.val()
    })
    inputDate.val('')
    inputBox.val('')
  
    paint()
  }
  
  function sortTodos(){
    todos.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime());
  }

  $('#sort').click(()=>{
      sortTodos()
      paint()
  })
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
  
  $("#reset").click(()=>{
    const inputBox = $('#newTodo')
    inputDate.val('')
    inputBox.val('')
  })

  $("ul").sortable();
  
  paint();
