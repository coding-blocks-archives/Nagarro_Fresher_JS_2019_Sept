let todos = [
  
];

function render(state) {
  return state
    .map(todo => {
      // const li = document.createElement('li')
      // li.classList.add("striked")
      // document.body.append(li)
        
      const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`

 
      var a='       '
      return `<li data-todo="${todo.id}" ${classString} draggable="true" ondragover="dragOver(event)" ondragstart="dragStart(event)"> ${todo.name +" "+todo.date}  </li>`;
    })
    .join("");
}

function paint() {
  $("ul").html(render(todos));
}

function addTodo() {
  // document.getElementById('newTodo') != $('#newTodo')
  const inputBox = $('#newTodo')
  const dlBox = $('#deadline')

  todos.push({
    id: todos.length + 1,
    name: inputBox.val(),
    done: false,
    date:dlBox.val()
  })

  inputBox.val('')

  paint()
}
function sortTodos() {
  todos.sort(function(a,b){  return new Date(b.date) - new Date(a.date)  })

  paint()
}


function removeTodos() {
  todos = todos.filter(todo => !todo.done)

  paint()
}
function removeAllTodos() {
  todos = []

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







var _el;

function dragOver(e) {
if (isBefore(_el, e.target))
    e.target.parentNode.insertBefore(_el, e.target);
else
    e.target.parentNode.insertBefore(_el, e.target.nextSibling);
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = "move";  
  e.dataTransfer.setData("text/plain", null);
  _el = e.target;
}

function isBefore(el1, el2) {
  if (el2.parentNode === el1.parentNode)
    for (var cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
  if (cur === el2)
    return true;
  return false;
} 
 
