let todos = [
  {
    id: 1,
    name: "Teach Class at Nagarro",
    done: true,
    deadline:"2019-09-29"
  },
  {
    id: 2,
    name: "Get Coffee",
    done: false,
    deadline:"2019-09-30"
  }
];

function render(state) {
  return state
    .map(todo => {
      
      const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
      const classString2 = todo.done ? `class = "striked"` : `class = ""`
      return `<li data-todo="${todo.id}" ${classString}
      draggable="true" ondragover="dragOver(event)" ondragstart="dragStart(event)">
      <span data-todo="${todo.id}"> ${todo.name} </span>
      <p>
      <span data-todo="${todo.id}" ${classString2}> Deadline is: ${todo.deadline}</span>
      </p> 
      </li>`;
    })
    .join("");
}

function paint() {
  $("ul").html(render(todos));
}

function addTodo() {
  // document.getElementById('newTodo') != $('#newTodo')
  let inputBox = $('#newTodo')
  let dl=$('#deadline')
if(inputBox.val()=='' || dl.val()==''){
  window.alert("Please enter values data")
}
else{
  todos.push({
    id: todos.length + 1,
    name: inputBox.val(),
    done: false,
    deadline: dl.val()
  })
  
  inputBox.val('')
  dl.val('')
  paint()
}
}



function removeTodos() {
  todos = todos.filter(todo => !todo.done)

  paint()
}

function resetTodos() {
  todos = todos.filter(todo => !todo)

  paint()
}

$('#sort').click(() =>{
  todos.sort((a,b) => {
      return new Date(a.deadline) - new Date(b.deadline);
  })
  paint();
})

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

var _el;

function dragOver(e) {
  if (isBefore(_el, e.target))
    e.target.parentNode.insertBefore(_el, e.target);
  else
    e.target.parentNode.insertBefore(_el, e.target.nextSibling);
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", null);
  _el = e.target;
}

function isBefore(el1, el2) {
  if (el2.parentNode === el1.parentNode)
    for (var cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
      if (cur === el2)
        return true;
  return false;
}