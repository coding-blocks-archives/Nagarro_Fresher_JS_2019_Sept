let todos = [
    {
      id: 1,
      name: "Teach Class at Nagarro",
      done: true,
      deadline: "2019-11-09"
    },
    {
      id: 2,
      name: "Get Coffee",
      done: false,
      deadline: "2019-10-09"
    }
  ];
  
  function render(state) {
    return state
      .map(todo => {
        const classString = todo.done ? `class = "striked"` : ''
        return `<li data-todo="${todo.id}" ${classString}> ${todo.name} ${todo.deadline} 
        <button data-button="up">⬆</button>
        <button data-button="down">⬇</button> </li>`;
      })
      .join("");
  }

  function reset(){
    const inputBox = $('#newTodo')
    const dl = $('#deadline')

    inputBox.val('')
    dl.val('')
  }
  
  function paint() {
    $("ul").html(render(todos));
  }
 function deleted(){
  todos=todos.filter(todo => !todo.done)

  paint();
 } 
  function addTodo() {
    // document.getElementById('newTodo') != $('#newTodo')
    const inputBox = $('#newTodo')
    const dl = $('#deadline')
    todos.push({
      id: todos.length + 1,
      name: inputBox.val(),
      done: false,
      deadline : dl.val()
    })
   
    inputBox.val('')
    dl.val('')
    
    paint()
  }
  
  function sortTodo(){
    todos.sort(function(a, b) { return new Date(a.deadline) - new Date(b.deadline) })
        paint()
  }
  
  $('ul').on("click", function (e){  
    if((e.target.dataset.button === "up" || e.target.dataset.button === "down"))
    {
      if(e.target.dataset.button === "up")
      {
        if(e.target.parentElement.previousElementSibling == null)
          return;
        e.target.parentElement.parentElement.insertBefore(
          e.target.parentElement,
          e.target.parentElement.previousElementSibling
        )
      }
      else
      {
        if(e.target.parentElement.nextElementSibling == null)
          return;
        e.target.parentElement.parentElement.insertBefore(
          e.target.parentElement.nextElementSibling,
          e.target.parentElement
        )
      }
    }

    else
    {
        
      const idToFind = e.target.dataset.todo
      const todo = todos.find(todo => todo.id == idToFind)
      todo.done = !todo.done
      paint();
  
    }
  })
 
  paint();
