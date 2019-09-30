$(document).ready(display);



let ToDoList = [
  {
    id: 1,
    name: "Teach Class at Nagarro",
    done: false,
    deadline: new Date()
  },
  {
    id: 2,
    name: "Go to dance Class",
    done: false,
    deadline: new Date()
  }

];

function render(state) {
  return state
    .map(todo => {
      const classString = todo.done ? `striked` : ``
      return `<li data-todo="${todo.id}" class="list-group-item ${classString}" data-toggle="modal" data-target="#editModal"> ${todo.name}<span class="${classString}"> ${todo.deadline.toLocaleDateString()} </span> </li>`;
    })
    .join("");
}

function display() {
  $('ul').sortable();
  if (ToDoList.length === 0) {
    $("ul").html('<br/><h4 style="color:#CF1678; font-family:cursive;"> No ToDo.. </h4>');
  } else {
    $("ul").html(render(ToDoList));
  }

}

$("#deadlineTodo").datepicker();

function addTodo() {
  const input = $('#newTodo')
  const inputDeadline = $('#deadlineTodo')
  var currentDate = new Date()
  $(".error").remove();

  if (input.val().length < 1) {
    $('#newTodo').after('<span class="error">This field is required</span>');
  }
  if (inputDeadline.val().length < 1) {
    $('#deadlineTodo').after('<span class="error">This field is required</span>');
    return;
  }
  if (currentDate > new Date(inputDeadline.val()) ){
    $('#deadlineTodo').after('<span class="error">Date Expired</span>');
    return;
  }

  if ((input.val() !== "") && ($.trim(input.val()) !== "")) {
    var myDeadline = new Date(inputDeadline.val())
    ToDoList.push({
      id: ToDoList[ToDoList.length-1].id + 1,
      name: input.val(),
      done: false,
      deadline: myDeadline
    })
    input.val('')
    inputDeadline.val('')
  }
  display()
}

function sortToDo() {
  ToDoList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
  display()
}

function sortDeadlineToDo() {
  ToDoList.sort((a, b) => (a.deadline > b.deadline) ? 1 : ((b.deadline > a.deadline) ? -1 : 0));
  display()
}

function resetToDo() {
  ToDoList.length = 0;
  display()
}

function deleteTodos() {
  ToDoList = ToDoList.filter(todo => !todo.done)
  display()
}



$('ul').on("click", function (e) {
  const idToFind = e.target.dataset.todo
  const todo = ToDoList.find(todo => todo.id == idToFind)
  todo.done = !todo.done
  display()
})

$('#newTodo').on("keypress", function (e) {
  if (e.which == 13) {
    addTodo()
  }
})

$('#deadlineTodo').on("keypress", function (e) {
  if (e.which == 13) {
    addTodo()
  }
})

/*

arr = $.grep(arr, function(value) {
  return value != removeItem;
});

*/