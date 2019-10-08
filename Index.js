let todos = [
    {
      id: 1,
      name: "Teach Class at Nagarro",
      done: true,
      deadline:'09-30-2019'
    },
    {
      id: 2,
      name: "Get Coffee",
      done: false,
      deadline:'10-30-2019'
    }
  ];
  
  function render(state) {
    return state
      .map(todo => {
        // const li = document.createElement('li')
        // li.classList.add("striked")
        // document.body.append(li)
        const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
        return `<li data-todo="${todo.id}" ${classString}>
        <button data-button="btnup">⬆</button>	       
        <button data-button="btndn">⬇</button> 	       
        ${todo.name} <small><span style="float: right;">${todo.deadline}</span></small>    
        </li>`;
      })
      .join("");
  }
  
  

  function paint() {
    $("ul").html(render(todos));
  }
  
  function addTodo() {
    // document.getElementById('newTodo') != $('#newTodo')
    const inputBox = $('#newTodo')
    const dateBox = $('#TodoDate')
    if(inputBox.val() == '' || dateBox.val() == '' )	 
      return;	    
   
    todos.push({
      id: todos.length + 1,
      name: inputBox.val(),
      done: false,
      deadline:dateBox.val()
    })
  
    inputBox.val('')
    dateBox.val('')
  
    paint()
  }
  $('ul').on("click", function (e) {
    if(!(e.target.dataset.button==="btnup" || e.target.dataset.button === "btndn"))	  
      {	    
          let idToFind = e.target.dataset.todo	        
          let todo = todos.find(todo => todo.id == idToFind)	       
          todo.done = !todo.done	        
          paint();	       
      }	    
    else{	 
      if(e.target.dataset.button==="btnup")	    
      {	    
 e.target.parentElement.parentElement.insertBefore(
          e.target.parentElement,	        
          e.target.parentElement.previousElementSibling	       
          )	      
      }	   
      else 	   
      {	  
          e.target.parentElement.parentElement.insertBefore(
              e.target.parentElement.nextElementSibling,	 
              e.target.parentElement         
          )	       
      }	    
  }	
  })	
 
  function resetTodo()
  {	  
    $('#newTodo').val('')	 
    $('#TodoDate').val('')	   
      	      
  }	  
  function sortTodo()
  {	  
    todos.sort(function(a, b) { return new Date(a.deadline) - new Date(b.deadline) })	   
    paint();	    
  }	  

  function removeTodos() {
    todos = todos.filter(todo => !todo.done)
  
    paint()
  }
  
  
//   $('ul').on("click", function (e) {
//     const idToFind = e.target.dataset.todo
//     const todo = todos.find(todo => todo.id == idToFind)
//     todo.done = !todo.done
  
//     paint()
//   })
  
  $('#newTodo').on("keypress", function (e) {
    if (e.which == 13) {
      addTodo()
    }
  })
  
  paint();