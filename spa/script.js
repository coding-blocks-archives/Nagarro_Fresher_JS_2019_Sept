var deletBtn 
let todos =[]

let todos1=[]

function render(state){

    return state.map(todo => {   
    const classString = todo.done ? `class="list-group-item striked"`: `class="list-group-item"` 
    // const classString1 = todo.done ? `class="striked"`: `class=""`  
    return `<li data-todo = "${todo.id}" ${classString}
            draggable="true" ondragover="dragOver(event)" ondragstart="dragStart(event)">   
        <span data-todo = "${todo.id}">
            ${todo.name}
        </span>
        <span data-todo = "${todo.id}"> 
            <button data-todo = "${todo.id}" id="delete" onclick = "RemoveList(this) "> X </button> 
        </span>
        <p> 
          <span data-todo = "${todo.id}" ${classString} >DeadLine is : ${todo.deadline}</span>
        </p>
    <li>`
    })
    .join("");
}

{/* */}
function Paint(){
    $('ul').html(render(todos))
  }

function addTodo(){
    let inputBox = $("#newTask")
    let dlBox = $("#deadline")
    
    if(inputBox.val() == '' || dlBox.val()== ''){
        window.alert("Please enter in both textBoxes")
    }
    else{
        todos.push(
            {
                id:todos.length+1,
                name:inputBox.val(),
                done:false,
                deadline:dlBox.val()
            }
        )
        inputBox.val('')
        dlBox.val("")
        Paint()    
    }  
}

$('#newTask').on('keypress',function(e){

    if(e.which ==13){
        addTodo();
    }
})

$("#addTask").on('click' , () => {
    
    addTodo();
   })
//----------------Empty todos array-----------------------
function removeTodo(){
    let length = todos.length
    
    todos.splice(0,length);
   
   Paint();
}

function removeTodo1(){
    let length = todos.length
    for(let i=0; i < length;i++){
        todos.pop();
    }
}
//-------------------delete array elements on clicking reset button-----------------

$("#reset").on('click', () => {
    removeTodo();
})

//-----------Delete Todo------------------------

function RemoveList(e){
   
    const that = e.parentNode.parentNode;
    let idToFind = todos.find(todo=>todo.id == that.dataset.todo); 
    let index= todos.indexOf(idToFind)
    console.log(index)
    todos.splice(index,1)
    
    $('ul').html(render(todos))
}

//---------------------striked on clicking-----------------------
$('#taskList').on('click',(e)=>{

    const idToFind = e.target.dataset.todo;
    const todoItem = todos.find(todo =>todo.id == idToFind)
    todoItem.done = !todoItem.done
    Paint() 
    
})

//----sort by deadline------------------------------

$('#sort').click(() =>{
    todos.sort((a,b) => {
        return new Date(a.deadline) - new Date(b.deadline);
    })
    Paint();
})

//----------delete striked task items-------------------------------
$('#bin').click(() =>{
   todos= todos.filter(todo => !todo.done)
    Paint();
})


//----------------sort by Items done/undone------------------------------------------
$('#sortbyItems').on("click", ()=>{

    PrintUnDone()
    PrintDone()
    sortbyItems()
})
let foundDoneItems=[
    {
    }
]
let foundUnDoneItems=[
    {
    }
]
function PrintDone(){

    foundDoneItems=todos.filter(todo =>todo.done == true)
      
}
function PrintUnDone(){
  
    foundUnDoneItems=todos.filter(todo => todo.done == false)
    
}

function sortbyItems(){
    
    removeTodo1()
    console.log(todos)
    
    for(var i=0;i<foundUnDoneItems.length;i++){
       
        todos.push(foundUnDoneItems[i]);
    }
    console.log(todos)
    for(var i=0;i<foundDoneItems.length;i++){
        
        todos.push(foundDoneItems[i]);
    }
   
    Paint()
}

//------------------------move elements from one position to another--------------------------
var _el;

function dragOver(e) {
  if (isBefore(_el, e.target))
    e.target.parentNode.insertBefore(_el, e.target);
  else
    e.target.parentNode.insertBefore(_el, e.target.nextSibling);
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", null);
  _el = e.target;
}

function isBefore(el1, el2) {
  if (el2.parentNode === el1.parentNode)
    for (var cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
      if (cur === el2)
        return true;
  return false;
}
//------------------------------------------------------------------------------------------------
