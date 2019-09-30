
let todos = [
    {
      id: 1,
      name: "Teach Class at Nagarro",
      done: true,
      dateoftodo: "2019-09-2"
    },
    {
      id: 2,
      name: "Get Coffee",
      done: false,
      dateoftodo: "2019-09-3"
    }
  ];
  
  function render(state) {
    return state
      .map(todo => {
        // const li = document.createElement('li')
        // li.classList.add("striked")
        // document.body.append(li)
        const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
      return `<li data-todo="${todo.id}" ${classString}> ${todo.name} ${todo.dateoftodo}<button data-button="buttonUp">🔺</button><button data-button="buttonDown">🔻</button> </li>`;
      })
      .join("");
  }
  
  function paint() {
    $("ul").html(render(todos));
  }
  
  $('ul').on("click", function (e) {
    if (!(e.target.dataset.button === "buttonUp" || e.target.dataset.button === "buttonDown")) {

      let idToFind = e.target.dataset.todo
      let item = todos.find(todo => todo.id == idToFind);
      item.done = !item.done
      paint();
    }
    else {
  
      if (e.target.dataset.button === 'buttonUp') {
        if(e.target.parentElement.previousElementSibling == null)
          return;
        e.target.parentElement.parentElement.insertBefore(
          e.target.parentElement,
          e.target.parentElement.previousElementSibling
        )
      }
      else {
        if(e.target.parentElement.nextElementSibling == null)
          return;
        e.target.parentElement.parentElement.insertBefore(
          e.target.parentElement.nextElementSibling,
          e.target.parentElement
        )
      }
    }
  })

  function sortTodo()
  {
    todos.sort(function(a, b) { return new Date(a.dateoftodo) - new Date(b.dateoftodo) })
    paint()
  }

  function addTodo() {
    // document.getElementById('newTodo') != $('#newTodo')
    const inputBox = $('#newTodo')
    const deadline = $('#tododate')
    todos.push({
      id: todos.length + 1,
      name: inputBox.val(),
      done: false,
      dateoftodo: deadline.val()
    })
  
    inputBox.val('')
    deadline.val('')
    paint()
  }
  
  
  
  function removeTodos() {
    todos = todos.filter(todo => !todo.done)
  
    paint()
  }
  
 
  $('#newTodo').on("keypress", function (e) {
    if (e.which == 13) {
      addTodo()
    }
  })
  
  paint();
