let todos = [];
  
  function render(state) {
    return state
      .map(todo => {
        const classString = todo.done ? `class = "striked"` : ''
        return `<li data-todo="${todo.id}" ${classString} > ${todo.name} </li>`;
      })
      .join("");
  }
  
  function paint() {
    $("ul").html(render(todos));
  }
  
  function addTodo() {
    // document.getElementById('newTodo') != $('#newTodo')
    const inputBox = $('#newTodo')
    todos.push({
      id: todos.length + 1,
      name: inputBox.val(),
      done: false,
    //   deadline: inputBox.getDate()
    })
  
    inputBox.val('')
    inputBox.focus();
  
    paint();
  }
 $('#btn').on('click',function(){
     removeTodos();
     paint();
 })
 function removeTodos(){
     console.log("Event clicked");
   todos= todos.filter(item=>!item.done)
   console.log(todos);
    
 }
  
  
  $('ul').on("click", function (e) {
    const idToFind = e.target.dataset.todo
    const todo = todos.find(todo => todo.id == idToFind)
    todo.done = !todo.done
  
    paint()
  })

  $(function(){
      $('ul').sortable();
      $('ul').disableSelection();
  });

  $('button.reset').on('click',function(e){
      let templist=[];
      let count=todos.length-1;
     
      while(count>=0)
      {
        let temp=todos.find(todo=>!todo.done)
        if(temp==undefined){
            break;
        }
        if(!temp.done){
          templist.push(temp);
          let index=todos.indexOf(temp);
          todos.splice(index,1);
          count=count-1;
          }
          else{
              count=count-1;
          }
      }
      count=todos.length-1;
      while( count>=0)
      {
          
        let temp=todos.find(todo=>todo.done)
          templist.push(temp);
          let index=todos.indexOf(temp);
          todos.splice(index,1);
          count=count-1;
      }
         
          todos=templist;

          paint();

  });
  paint();