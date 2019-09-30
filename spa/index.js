let count = 1

let todos = [
  {
    id: 1,
    name: "Teach Class at Nagarro",
    done: true
  },
  {
    id: 2,
    name: "Get Coffee",
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
      return `<li data-todo="${todo.id}" ${classString}><a class='up' href='#' onclick="return upFunc()"><img src="upArrow.png"></a> <a class='down' href='#' onclick="return downFunc()"><img src="downArrow.png"></a> &nbsp;${todo.name}</li>`;
      
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
    done: false
  })

  inputBox.val('')

  paint()
}



function removeTodos() {
  todos = todos.filter(todo => !todo.done)

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

//for up
function upFunc(){
  var upLink = document.querySelectorAll(".up");

	for (var i = 0; i < upLink.length; i++) {
		upLink[i].addEventListener('click', function () {
			var wrapper = this.parentElement;

			if (wrapper.previousElementSibling)
			    wrapper.parentNode.insertBefore(wrapper, wrapper.previousElementSibling);
		});
  }
}
  
//for down
function downFunc(){
  var downLink = document.querySelectorAll(".down");

  for (var i = 0; i < downLink.length; i++) {
    downLink[i].addEventListener('click', function () {
      var wrapper = this.parentElement;
      if (wrapper.nextElementSibling)
        wrapper.parentNode.insertBefore(wrapper.nextElementSibling, wrapper);
    });
  }
}

function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("list");
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("LI");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
       
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}