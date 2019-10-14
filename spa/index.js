let todos = [
    {
      id: 1,
      name: "Teach Class at Nagarro",
      deadline: "2019-10-23",
      done: true
    },
    {
      id: 2,
      name: "Get Coffee",
      deadline: "2019-10-20",
      done: false
    }
  ];
  
  function render(state) {
    return state
      .map(todo => {
        // const li = document.createElement('li')
        // li.classList.add("striked")
        // document.body.append(li)
        const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
       return `<li data-todo="${todo.id}" ${classString}> ${todo.name} ${todo.deadline} <button class="btn" data-todo="${todo.id}">Up</button><button class="btn" data-todo="${todo.id}">Down</button> </li>`;

      })
      .join("");
  }
  
  function paint() {
      const btn="<button>Hello<button>"
    $("ul").html(render(todos))

  }
  
  function addTodo() {
    // document.getElementById('newTodo') != $('#newTodo')
    const inputBox = $('#newTodo')
    const deadline = $('#deadline')
    todos.push({
      id: todos.length + 1,
      name: inputBox.val(),
      deadline: deadline.val(),
      done: false
    })
  
    inputBox.val('')
    deadline.val('')
  
    paint()
  }

  function moveUp(id){
    const tempArray = [].concat(todos);
   tempArray.push(tempArray.shift())
    todos = tempArray.map((el, index) => ({
      ...el,
      id: index + 1,
    }))
    paint()
  }


    function moveDown(id){
      const tempArray = [].concat(todos);
      tempArray.unshift(tempArray.pop())
      todos = tempArray.map((el, index) => ({
        ...el,
        id: index + 1,
      }))
  
    
      paint()
    }
  
  
  
  function removeTodos() {
    todos = todos.filter(todo => !todo.done)
  
    paint()
  }

  function reset()
  {
    const inputBox = $('#newTodo')
    const deadline = $('#deadline')
    inputBox.val('')
    deadline.val('')
  }

  function sortTodos()
  {
      todos.sort(function(a,b){
        return new Date(a.deadline)-new Date (b.deadline); 
      })
      paint()
  }
  
  
  $('ul').on("click", function (e) {
    if(e.target.localName === 'button'){
      if(e.target.innerText === "Up"){
        moveUp(+e.target.dataset.todo)
      }else if (e.target.innerText === "Down"){
        moveDown(+e.target.dataset.todo)
      }
    }else{
      const idToFind = e.target.dataset.todo
      const todo = todos.find(todo => todo.id == idToFind)
      todo.done = !todo.done
    
      paint()
    }
    
  })
  
  $('#newTodo').on("keypress", function (e) {
    if (e.which == 13) {
      addTodo()
    }
  })
  
  paint();