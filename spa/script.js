const todoList = $('#todoList');
const addBtn = $('#addBtn');
const newTodo = $('#newTodo');
const todoDate = $('#todoDate');
const allBtn = $('#allBtn');
const activeBtn = $('#activeBtn');
const completedBtn = $('#completedBtn');
const clearCompletedBtn = $('#clearCompletedBtn');
const sortBtn = $('#sortBtn');
const resetBtn = $('#resetBtn');
const actionsDiv = $('#actionsDiv');

let allTodos = [];
let activeTodos = [];
let completedTodos = [];



const addTodo = () => {
    
    actionsDiv.show();

    let newId = allTodos.length == 0 ? 1 : allTodos[allTodos.length - 1].id + 1;
    
    let newTodoObj = { 
        id : newId,
        done : false,
        todo : newTodo.val(),
        lastDate : todoDate.val() 
    };
    
    newTodo.val("");
    allTodos.push(newTodoObj);
    // displayTodos();
    todoList.append(getTodoHtml(newTodoObj));
    // displayAllTodos();
}

const getTodoHtml = (todoObj) => {
    const classString = todoObj.done ? `style = "text-decoration : line-through;"` : ``;
    let todoHtml = `<li data-id="${todoObj.id}"  > 
                    <span class = 'todo' ${classString} > ${todoObj.todo} </span>
                    <span class = 'lastDate'> &nbsp &nbsp  <small> Last Date : ${todoObj.lastDate} </small> &nbsp </span>
                    <span class = 'deleteBtn' > &#10060; </span>
                    <span class = 'upBtn' > &#x290A; </span>
                    <span class = 'downBtn' > &#x290B; </span>
                    </li>`;
    
    return todoHtml;
}

const displayTodos = (todos) => {
    let todosInnerHtml = "";
    
    for(todoObj of todos) {

        todosInnerHtml += getTodoHtml(todoObj);
    }

    todoList.html(todosInnerHtml);
}

const displayAllTodos = () => {
    displayTodos(allTodos);
    allBtn.attr('style','background : #ddd');
    activeBtn.attr('style','background : #eee');
    completedBtn.attr('style','background : #eee');
}

const displayCompletedTodos = () => {
    completedTodos = allTodos.filter(todo => todo.done);
    displayTodos(completedTodos);
    allBtn.attr('style','background : #eee');
    activeBtn.attr('style','background : #eee');
    completedBtn.attr('style','background : #ddd');
}

const displayActiveTodos = () => {
    activeTodos = allTodos.filter(todo => !todo.done);
    displayTodos(activeTodos);
    allBtn.attr('style','background : #eee');
    activeBtn.attr('style','background : #ddd');
    completedBtn.attr('style','background : #eee');
}

const renderTodo = (targetTodoElement, targetId) => {

    const targetTodo = allTodos.find((todoObj) => targetId == todoObj.id);
    targetTodo.done = !targetTodo.done;
    const classString = targetTodo.done ? `line-through` : ``;
    targetTodoElement.style.textDecoration = classString;
}

const sortTodos = () => {

    allTodos.sort( (a,b) => {
        a = new Date(a.lastDate);
        b = new Date(b.lastDate);
        return a-b;
    });
    displayAllTodos();
}

const clearCompletedTodos = () => {
    allTodos = allTodos.filter((todoObj) => !todoObj.done);
    allTodos.length == 0 ? actionsDiv.hide() : '';
    displayAllTodos();
}

const deleteTodo = (targetTodoElement, targetId) => {
    targetTodoElement.parentElement.remove();
    allTodos = allTodos.filter((todoObj) => todoObj.id != targetId);
    allTodos.length == 0 ? actionsDiv.hide() : '';
}

const moveTodoUp = (targetTodoElement, targetId) => {
    
    targetTodoElement.parentElement.parentElement.insertBefore(
        targetTodoElement.parentElement,
        targetTodoElement.parentElement.previousElementSibling);

    const targetTodo = allTodos.find((todoObj) => targetId == todoObj.id);
    const targetTodoIndex = allTodos.indexOf(targetTodo);

    let swapIndex = targetTodoIndex == 0 ? allTodos.length - 1 : targetTodoIndex - 1;
    let targetTodoObj = allTodos[targetTodoIndex];
    allTodos[targetTodoIndex] = allTodos[swapIndex];
    allTodos[swapIndex] = targetTodoObj;
}

const moveTodoDown = (targetTodoElement, targetId) => {

    targetTodoElement.parentElement.parentElement.insertBefore(
        targetTodoElement.parentElement.nextElementSibling,
        targetTodoElement.parentElement);

    const targetTodo = allTodos.find((todoObj) => targetId == todoObj.id);
    const targetTodoIndex = allTodos.indexOf(targetTodo);

    let swapIndex = (targetTodoIndex + 1) % allTodos.length;
    let targetTodoObj = allTodos[targetTodoIndex];
    allTodos[targetTodoIndex] = allTodos[swapIndex];
    allTodos[swapIndex] = targetTodoObj;
}

addBtn.on("click", addTodo);

newTodo.on("keypress", (e) => {
    if(e.which == 13){  
        addTodo();
    }
  });

todoDate.on("keypress", (e) => {
    if(e.which == 13){ 
        addTodo();
    }
  });  


todoList.on("click", (e) => {
    
    const targetTodoElement = e.target; 
    const actionOn = targetTodoElement.className;
    const targetId = targetTodoElement.parentElement.dataset.id;
  
    if(actionOn == 'todo'){
        renderTodo(targetTodoElement, targetId);
    } else if(actionOn == 'deleteBtn'){
        deleteTodo(targetTodoElement, targetId);
    } else if(actionOn == 'upBtn'){
        moveTodoUp(targetTodoElement, targetId);
    } else if(actionOn == 'downBtn'){
        moveTodoDown(targetTodoElement, targetId);
    }
    
})

const resetTodos = () => {
    allTodos = [];
    displayAllTodos();
    actionsDiv.hide();
}

allBtn.on('click', displayAllTodos);
activeBtn.on('click', displayActiveTodos);
completedBtn.on('click', displayCompletedTodos);
clearCompletedBtn.on('click', clearCompletedTodos);
sortBtn.on('click', sortTodos);
resetBtn.on('click', resetTodos);
