/*
 * @author : akshatjain
 */

// Todo Array Const Array

const todos = [];

//Clear the Input Field by the clear Button

$("#clearItm").click(function (e) {
    e.preventDefault();
    clearTextAndFocus()
});

//Add the data in the table by clicking the add button

$("#addItm").click(function (e) {
    e.preventDefault();
    addTask(e);
});

//Add Item in the tasks by keypress of the Enter

$('.form-control-plaintext').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        addTask(event);
    }
});

//add data in the table by the function

function addTask(e) {
    if ($("#taskData").val().length <= 0 || $("#completeionTIme").val().length <= 0) {
        alert("Empty Task Cannot Be Added");
    } else {
        let todo = createTodo();
        $("#allTaskLists").append(
            render(todo)
        )
        clearTextAndFocus();
    }
}

function render(todo) {
    var htmlCode = $("<tr>")
    if (todo.active) {
        htmlCode.addClass("table-active")
    } else {
        htmlCode.addClass("table-danger")
            .css("text-decoration", "line-through");
    }
    htmlCode
        .attr("data-todoID", todo.id)
        .append(
            $("<th>")
            .text(todo.name)
        )
        .append(
            $("<th>")
            .text(todo.deadline.getDate() + "/" + (todo.deadline.getMonth() + 1) + "/" + (todo.deadline.getYear() + 1900))
        )
        .append(
            actionButtonUI()
        )

    return htmlCode;
}

function actionButtonUI() {
    return $("<td>")
        .append(
            $("<button>")
            .addClass("move up")
            .text("⬆")
        )
        .append(
            $("<button>")
            .addClass("move down")
            .text("⬇")
        )
        .append(
            $("<button>")
            .addClass("delete")
            .text("🗑️")
        )
}

//Move the TR up/down logic...

$(document).on("click", "button.move", function (e) {
    var row = $(this).closest('tr');
    if ($(this).hasClass('up')) {
        row.prev().before(row);
    } else {
        row.next().after(row);
    }
});

//Delete the TR from the table...

$(document).on("click", "button.delete", function (e) {
    var row = $(this).closest('tr');
    let taskID = Number(row.attr("data-todoID"));
    removeTodo(taskID);
    row.remove();
    clearTextAndFocus();
});

function clearTextAndFocus() {
    $("#taskData").val("");
    $("#completeionTIme").val("");
    $("#taskData").focus();
}

//Done the Task in table update UI

$("body").on('click', '#allTaskLists>tr>th', function (e) {
    //Current Task:::
    let currentTask = $(this).closest('tr');
    let taskID = Number(currentTask.attr("data-todoID"));
    id = todos.findIndex(x => x.id === taskID);
    todos[id].active = !todos[id].active
    saveTODOSInLocal()

    let todo = render(todos[id]);

    currentTask.replaceWith(todo);
});

//Sort the completed the tasks in JS

$("#sortItms").click(function (e) {
    renderTable(false)
});

//Remove the Done Task table

$("#resetItm").click(function (e) {
    e.preventDefault();
    const grouped = groupBy(todos, todo => todo.active)
    let doneTODOS = grouped.get(false);

    doneTODOS.forEach(function (todo) {
        removeTodo(todo.id);
    });
    renderTable(false);
    clearTextAndFocus()
});

//Sorting The TODO by the Date...

function sortTODO() {
    todos.sort(function (a, b) {
        return a.deadline - b.deadline
    })
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

//Create TODO List DS

//Render Function

function renderTable(local) {
    var todosFromLocal;
    if (local) {
        todosFromLocal = getTODOSFromLocal();
        todosFromLocal.forEach(function (todo) {
            todo.deadline = new Date(todo.deadline)
            todos.push(todo)
        });
        sortTODO()
    } else {
        sortTODO()
        const grouped = groupBy(todos, todo => todo.active)
        let undoneTODOS = grouped.get(true);
        let doneTODOS = grouped.get(false);
        todosFromLocal = undoneTODOS.concat(doneTODOS);
    }

    // Clear HTML ...
    $("#allTaskLists").html("");

    todosFromLocal.forEach(function (todo) {
        if (todo != undefined) {
            $("#allTaskLists").append(
                render(todo)
            )
        }
    });
}

//Render Table Onload Timming

renderTable(true);

//Add

function createTodo() {
    let todoname = $("#taskData").val();
    let todoDeadline = $("#completeionTIme").val();

    let todo = {
        id: Math.floor(Math.random() * ((100) - (-100) + 1)),
        name: todoname,
        active: true,
        deadline: new Date(todoDeadline)
    }
    todos.push(todo);
    saveTODOSInLocal()

    return todo;
}

//Remove Todo

function removeTodo(taskID) {
    id = todos.findIndex(x => x.id === taskID);
    todos.splice(id, 1);
    saveTODOSInLocal()
}

//LocalStorage Work Here

function saveTODOSInLocal() {
    localStorage.setItem("MyTodos", JSON.stringify(todos))
}

function getTODOSFromLocal() {
    return JSON.parse(localStorage.getItem("MyTodos")) != null ? JSON.parse(localStorage.getItem("MyTodos")) : [];
}