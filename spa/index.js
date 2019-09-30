let todos = [];
var uniqueid = 1;

function render(state) {
  return state
    .map(todo => {
      const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
      return `<li data-todo="${todo.id}" ${classString} >
                  ${todo.name}
                  <strong><span style="float:right;"> 🗓${todo.date}</span></strong>
              </li>`;
    })
    .join("");
}

function paint() {
  $("ul").html(render(todos));
}
// function to add new data to todo list
function addTodo() {
  let inputBox = $('#newTodo')
  let inputDate = $('#newDate')
  if (inputBox.val() == '' || inputDate.val() == '')
    return;
  todos.push({
    id: ++uniqueid,
    name: inputBox.val(),
    done: false,
    date: inputDate.val(),
  })

  inputBox.val('')
  inputDate.val('')

  paint()
}
// action for clean button
function removeTodos() {
  todos = todos.filter(todo => !todo.done)
  paint()
}

$("ul").sortable({
      update: function (event, ui) {
        let temp = [];
        var idsInOrder = $("ul").sortable().toArray();
    
        children = idsInOrder[0].children;
        for (var i = 0; i < children.length; i++) {
          temp[i] = todos.find(todo => todo.id == children[i].attributes['0'].value)
        }
        todos = temp;
        paint();
      }
})
// action for changing todo list item to strike through
$('ul').on("click", function (e) {

  let idToFind = e.target.dataset.todo
  let todo = todos.find(todo => todo.id == idToFind)
  todo.done = !todo.done

  paint();
})
// action when enter key pressed on task to do area
$('#newTodo').on("keypress", function (e) {
  if (e.which == 13) {
    addTodo()
  }
})
// action when enter key pressed on enter date area
$('#newDate').on("keypress", function (e) {
  if (e.which == 13) {
    addTodo()
  }
})
let inputBox = $('#newTodo')
let inputDate = $('newDate')
// action for rest button
$('#reset').click(() => {
  inputBox.val('')
  inputDate.val(' ')
})
// action for sort button
$('#sort').click(() => {
  todos.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  })
  paint();
})
paint();
