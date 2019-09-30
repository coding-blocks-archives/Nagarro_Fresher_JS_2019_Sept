let todos = [

    {

        id: 1,

        name: "Teach Class at Nagarro",

        done: true,

        deadline: new Date("2012-01-09T11:25:13Z")

    },

    {

        id: 2,

        name: "Get Coffee",

        done: false,

        deadline: new Date("2012-01-01T06:25:24Z")

    }

];



function render(state) {

    return state

        .map(todo => {

            // const li = document.createElement('li')

            // li.classList.add("striked")

            // document.body.append(li)

            const classString = todo.done ? `class = "list-group-item striked draggable"` : `class = "list-group-item draggable"`

            return `<li data-todo="${todo.id}" ${classString} draggable="true">${todo.name}<span style="float:right;"> ${todo.deadline}</span></li>`;

        })

        .join("");

}


function paint() {  

    $("ul").html(render(todos));

}

function sortByDeadline() {
        todos.sort(function (a, b) {
        var keyA = new Date(a.deadline),
            keyB = new Date(b.deadline);
        return keyA-keyB;
    });

    paint();
}


function addTodo() {

    // document.getElementById('newTodo') != $('#newTodo')

    const inputBox = $('#newTodo')
    const deadBox = $('#newTodoDead')
    var date = new Date(deadBox.val())
    console.log(deadBox)
    todos.push({

        id: todos.length + 1,

        name: inputBox.val(),

        done: false,

        deadline:date

    })



    inputBox.val('')
    deadBox.val('')



    paint();

}







function removeTodos() {

    todos = todos.filter(todo => !todo.done)



    paint()

}




$('ul').on("click", function (e) {

    
    const idToFind = e.target.dataset.todo
    const todo = todos.find(todo => todo.id == idToFind)

    todo.done = !todo.done

    paint();

})


$('#newTodo , #newTodoDead').on("keypress", function (e) {

    if (e.which == 13) {

        addTodo()

    }

})

$("#sortable").sortable({
    update: function (event, ui) {
        let temp = []
        var children = $(".list-group-item");
        for (let i = 0; i < children.length; i++) {
            var idtoswap = children[i].dataset;
            temp[i] = todos.find(todo => todo.id == idtoswap.todo)
        }

        todos = temp;

    }
});


paint();