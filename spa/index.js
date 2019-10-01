let todos = [
    {
      id: 1,
      name: "Teach Class at Nagarro",
      done: true,
      d:"2019-11-23"
    },
    {
      id: 2,
      name: "Get Coffee",
      done: false,
      d:"2020-11-28"
    }
  ];
  
  function render(state) {
    return state
      .map(todo => {
        // const li = document.createElement('li')
        // li.classList.add("striked")
        // document.body.append(li)
       
        const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
      return `<li data-todo="${todo.id}" ${classString}> ${todo.name} ${todo.d}<button class="btn" data-todo="${todo.id}">Up</button> ${' '}<button class="btn" data-todo="${todo.id}">Down</button> </li>`;
      })
      .join("");
  }
  
  function paint() {
    $("ul").html(render(todos));
    const upBtn=`<button id="ubtn">⬆</button>`
   
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

  
  function addTodo() {
    // document.getElementById('newTodo') != $('#newTodo')
    const inputdate=$('#dateInput')
    const inputBox = $('#newTodo')
    todos.push({
      id: todos.length + 1,
      name: inputBox.val(),
      done: false,
      d:inputdate.val()
    })
  
    inputBox.val('')
  
    paint()
  }
  
  
  
  function removeTodos() {
    todos = todos.filter(todo => !todo.done)
  
    paint()
  }
  function resetItems(){
    const inputBox = $('#newTodo')
    inputBox.val('')
  }

  $('#sortitems').click(()=>{
    todos.sort((b,a)=> new Date(a.d) - new Date(b.d) );
    paint()
})
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


