let todos = [
    {
      id: 1,
      deadline:"2013-01-01",
      name: "Teach Class at Nagarro",
      done: true
    },
    
  ];
  
  function render(state) {
    return state
      .map(todo => {
        // const li = document.createElement('li')
        // li.classList.add("striked")
        // document.body.append(li)
        const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
        return `<li data-todo="${todo.id}" ${classString}><button data-button="buttonUp">⬆</button><button data-button="buttonDown">⬇</button>
                ${todo.name}
                <h5 style="float:right"> 📆${todo.deadline}</h5></li>`;
      })
      .join("");
  }
  
  function paint() {
    $("ul").html(render(todos));
  }
  
   function removeTodos() {
    todos = todos.filter(todo => !todo.done)
  
    paint()
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
  
  function addTodo() {
    // document.getElementById('newTodo') != $('#newTodo')
    const inputBox = $('#newTodo')
    const inputdate= $('#datetime')

    if((inputBox.val() === '')||(inputdate.val() === ''))
    {
        window.alert("Empty Field!!")
    }
    else{
      todos.push({
        id: todos.length + 1,
        name: inputBox.val(),
        deadline: inputdate.val(),
        done: false
      })
    
      inputBox.val('')
      inputdate.val('')
        paint()
    }
    
  }

  $('#newTodo').on("keypress", function (e) {
    if (e.which == 13) {
      addTodo()
    }
  })

  $('#datetime').on("keypress", function (e) {
    if (e.which == 13) {
      addTodo()
    }
  })

  $('#reset').click(()=>
  {
    const inputBox = $('#newTodo')
    const inputdate= $('#datetime')
    inputBox.val('')
    inputdate.val('')
  })

  
  $('#sort').click(()=>
  {
    todos.sort((d1, d2) => new Date(d1.deadline) - new Date(d2.deadline))
    paint();
  })
   
    paint();
