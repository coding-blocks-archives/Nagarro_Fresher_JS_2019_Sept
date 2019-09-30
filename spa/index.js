let todos = [
  {
    id: 1,
    name: "Teach Class at Nagarro",
    done: true,
    deadLine: new Date()
  },
  {
    id: 2,
    name: "Get Coffee",
    done: false,
    deadLine: new Date()
  }
];

function render(state) {
  return state
    .map(todo => {
      // const li = document.createElement('li')
      // li.classList.add("striked")
      // document.body.append(li)
      const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
      return `<li data-date="${todo.deadLine}" data-todo="${todo.id}" ${classString}> ${todo.name}
       ${todo.deadLine}
       
      
                                  </li>`;
      
    })
    .join("");
}

function paint() {
  $("ul").sortable()
  $("ul").html(render(todos));
}

function addTodo() {
  // document.getElementById('newTodo') != $('#newTodo')
  const inputBox = $('#newTodo')
  todos.push({
    id: todos.length + 1,
    name: inputBox.val(),
    done: false,
    deadLine: $('#deadLine').val()
  })

  inputBox.val('')
  $('#deadLine').val('')

  paint()
}




 function sortTodos() {
  //  todos.sort(function(a,b){
  //    return a.deadLine-b.deadLine
  //  })
  $("li").sort(function(a,b){
    return new Date($(a).attr("data-date")) > new Date($(b).attr("data-date"));
}).each(function(){
    $("ul").prepend(this);
})

//paint();

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
