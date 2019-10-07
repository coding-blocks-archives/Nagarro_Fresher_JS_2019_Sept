let todos = [
    {
        id: 1,
        name: "Teach Class at Nagarro",
        done: true,
        deadline: new Date(2019, 11, 24)
    },
    {
        id: 2,
        name: "Get Coffee",
        done: false,
        deadline: new Date(2019, 10, 11)
    }
];

function render(state) {
    return state
        .map(todo => {
            //     // const li = document.createElement('li')
            //     // li.classList.add("striked")
            //     // document.body.append(li)
            //     const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
            //     return `<li data-todo="${todo.id}" ${classString}> ${todo.name} </li>`;
            const classString = todo.done ? `list-group-item striked` : `list-group-item`
            return `<li data-todo="${todo.id}" class="draggable ${classString}" draggable="true"> ${todo.name} <span style="float: right">${todo.deadline.getDate()}/${todo.deadline.getMonth()}/${todo.deadline.getFullYear()}</span></li>`;
        })
        .join("");
}

function paint() {
    $("ul").html(render(todos));
}


function addTodo() {
    // document.getElementById('newTodo') != $('#newTodo')
    const inputBox = $('#newTodo')
    const deadlinedate = $('#newTododate')
    todos.push({
        id: todos.length + 1,
        name: inputBox.val(),
        done: false,
        deadline: new Date(deadlinedate.val())
    })

    inputBox.val('')
    deadlinedate.val('')

    paint()
}



function removeTodos() {
    todos = todos.filter(todo => !todo.done)

    paint()
}

function sortTodos() {
    todos.sort(function (a, b) {
        return (new Date(a.deadline) - new Date(b.deadline))
    });

    paint()
}

$("#sortable").sortable({
    update: function (event, ui) {
        let temp = [];
        var idsInOrder = $("#sortable").sortable().toArray();

        children = idsInOrder[0].children;
        for (var i = 0; i < children.length; i++) {
            temp[i] = todos.find(todo => todo.id == children[i].attributes['0'].value)
        }
        todos = temp;
        paint();
    }
});

function reset() {
    // $("#newTodo").val('');
    // $("#newTododate").val('');
    todos = todos.filter(todo => !todo)
    paint()
}

$('ul').on("click", function (e) {
    const idToFind = e.target.dataset.todo
    $('ul').on("click", function (e) {
        paint()
    })

    // $('#newTodo').on("keypress", function (e) {
    $('#newTodo, #newTododate').on("keypress", function (e) {
        if (e.which == 13) {
            addTodo()
        }
    })

    paint();
})

