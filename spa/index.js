var len;
var temp;
var pos;
var StrikeToggleLocation;

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


paint();

function render(state) {

    return state

        .map(todo => {

        const classString = todo.done ? `class = "striked"` : ''

        return `<tr > 
        <td> <button class="btn btn-success btn-sm" onclick="moveup(${todo.id})">UP</button> </td>
        <td> <button class="btn btn-info btn-sm" onclick="movedown(${todo.id})">DOWN</button> </td>
        <td onclick="ToggleStrike(${todo.id})" data-todo="${todo.id}" ${classString} >  ${todo.name} </td>
        </tr>`;

    })

    .join("");

}



function moveup(pos) {
    debugger
    if (pos != 1) {
        const todo1 = todos.find(todo => todo.id == pos);
        const todo2 = todos.find(todo => todo.id == (pos - 1));

        var temp = todo1.id;
        todo1.id = todo2.id;
        todo2.id = temp;

        const idToFind = pos - 1;
        var ElementToReplaceId = idToFind - 1

        todos[idToFind] = todo2;
        todos[ElementToReplaceId] = todo1;


        paint()
    } else {

        len = todos.length;
        const todo1 = todos.find(todo => todo.id == len);
        const todo2 = todos.find(todo => todo.id == pos);

        temp = todo1.id;
        todo1.id = todo2.id;
        todo2.id = temp;


        todos[len - 1] = todo2;
        todos[pos - 1] = todo1;

        paint()
    }
}



function movedown(pos) {
    debugger
    if (pos != todos.length) {
        const todo1 = todos.find(todo => todo.id == pos);
        const todo2 = todos.find(todo => todo.id == (pos + 1));

        var temp = todo1.id;
        todo1.id = todo2.id;
        todo2.id = temp;

        const idToFind = pos - 1;
        var ElementToReplaceId = idToFind + 1

        todos[idToFind] = todo2;
        todos[ElementToReplaceId] = todo1;


        paint()
    } else {

        len = todos.length;
        pos=1;
        const todo1 = todos.find(todo => todo.id == len);
        const todo2 = todos.find(todo => todo.id == pos);

        temp = todo1.id;
        todo1.id = todo2.id;
        todo2.id = temp;


        todos[len - 1] = todo1;
        todos[pos - 1] = todo2;

        paint()
    }
}








function paint() {
    $("table").html(render(todos));
}


$('#newTodo').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
     addTodo()
    }
});


function addTodo() {

    // document.getElementById('newTodo') != $('#newTodo')
    $('button').on('click', function() {

    })

    debugger

    var inputBox = $('#newTodo')
    if (inputBox.val() != "") {
        todos.push({

            id: todos.length + 1,

            name: inputBox.val(),

            done: false,

        })

        inputBox.val('')
        paint()
    } else {
        alert('Todo Name is Required');
    }
}



function ToggleStrike(StrikeToggleLocation) {
    debugger
    const todo = todos.find(todo => todo.id == StrikeToggleLocation)
    todo.done = !todo.done

    paint();
}



function removeStrike() {
    debugger
    todos = todos.filter(todo => !todo.done)
    len = todos.length;
    for (var i = 1; i <= len; i++) {
        todo1 = todos[i - 1];
        todo1.id = i;
    }

    paint()
}