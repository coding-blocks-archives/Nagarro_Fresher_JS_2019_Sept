let todos = [
  {
    id: 1,
    name: "Teach Class at Nagarro",
    done: true,
    date:"2019-12-08",
  },
  {
    id: 2,
    name: "Get Coffee",
    done: false,
    date:"2019-12-18",
  }
];

function render(state) {
  return state
    .map(todo => {
      // const li = document.createElement('li')
      // li.classList.add("striked")
      // document.body.append(li)
      const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
      return `<li data-todo="${todo.id}" ${classString}><a class='up' href='#'>up</a> <a class='down' href='#'>down</a> <span>${todo.name} ${todo.date}</span> </li>`;
    })
    .join("");
}

function paint() {
  $("ul").html(render(todos));
}

function addTodo() {
  // document.getElementById('newTodo') != $('#newTodo')
  const inputBox = $('#newTodo')
  const dateBox=$('#date')
  todos.push({
    id: todos.length + 1,
    name: inputBox.val(),
    date:dateBox.val(),
    done: false
  })

  inputBox.val('')

  paint()
}

function sortTodos(){
  todos.sort(function(todo1,todo2){
    return new Date(todo1.date)-new Date(todo2.date)
  })
  paint()
}


function removeTodos() {
  todos = todos.filter(todo => !todo.done)

  paint()
}


$("body").on("click","ul>li>span", function (e) {
  // console.log(e.currentTarget.offsetParent)
  const idToFind = e.currentTarget.offsetParent.dataset.todo
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


// var upLink = document.querySelectorAll(".up");
var upLink = document.querySelectorAll(".up");

	for (var i = 0; i < upLink.length; i++) {
		upLink[i].addEventListener('click', function () {
      console.log("helooooooooooooo")
      var wrapper = this.parentElement;
      console.log(wrapper)
      console.log(wrapper.previousElementSibling)
			if (wrapper.previousElementSibling)
			    wrapper.parentNode.insertBefore(wrapper, wrapper.previousElementSibling);
		});
	}

	var downLink = document.querySelectorAll(".down");

	for (var i = 0; i < downLink.length; i++) {
		downLink[i].addEventListener('click', function () {
			var wrapper = this.parentElement;

			if (wrapper.nextElementSibling)
			    wrapper.parentNode.insertBefore(wrapper.nextElementSibling, wrapper);
		});
  }

  function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
