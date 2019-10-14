let addTask = document.querySelector("#addTask")
let bin = document.querySelector("#bin")
let MyList = document.querySelector("#MyList")
let Logout = document.querySelector("#Logout")
let taskList = document.querySelector("#taskList")
let edit = document.querySelector("#edit")
let update = document.querySelector("#update")

var newTask=$("#newTask");

var todos=[];

$("#addTask").on("click",()=>{

    console.log("in  js file" )
    fetch('/addTask', {
        method:'POST',
        headers:new Headers({'content-type':'application/JSON'}),
        body:JSON.stringify({"task":newTask.val()})
    })
    .then((data)=>{
        return data.json();
    })
    .then((data)=>{
        console.log(data);
        todos=data;
        newTask.val('')
        Paint(todos);
    })
})

var updateIndex 
function Edit(e){
  
    console.log('Hello in edit() file')
    let index = e.dataset.todo;
    const that = e.parentNode.parentNode;
    console.log(that,index);
    // todos.splice(index,1);

    console.log(todos[index]);
    var text = todos[index];
    newTask.val(text) ;
    updateIndex = index;
    
}
$("#update").on("click",function(){
        Update(updateIndex)
    }
)

function Update(index){
    let text = newTask.val();
    todos[index]=text;
   console.log("in update",todos[index]);
    
    fetch(`/update`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ "todos": todos})
    })
       
    .then(function(data) {   
        return  data.json()
    }) 
    .then(function(data) {
        console.log(data);
        Paint(data)
        newTask.val('')
    })
}
$("#MyList").on("click",()=>{

    console.log("in MyList file" )
    fetch('/MyList', {
        method:'POST',
        headers:new Headers({'content-type':'application/JSON'}),
        body:JSON.stringify({"user":todos})
    })
    .then((data)=>{
        return data.json();
    })
    .then((data)=>{
        console.log(data);
        todos=data;
        Paint(todos);
    })
})
$("#Logout").on("click",()=>{

    console.log("in Logout file" )
    fetch('/Logout', {
        method:'POST',
        headers:new Headers({'content-type':'application/JSON'}),
        body:JSON.stringify({})
    })
})

function render(state){

    return state.map(todo => {
        if(todo==null){

        }
        else{
            let id = todos.indexOf(todo)  
            const classString =  `class="list-group-item "`
            const classString1 = `class="float btn btn-danger ml-1"`
            const classString2 = `class="float btn btn-primary ml-1"`
            
            
            return `<li data-todo = "${id}" ${classString}
                    draggable="true" ondragover="dragOver(event)" ondragstart="dragStart(event)">   
                <span data-todo = "${id}">
                    ${todo}
                </span>
                <span data-todo = "${id}"> 
                    <button data-todo = "${id}" ${classString1}  id="delete" onclick = "RemoveList(this) "> Clear </button> 
                </span>
                <span data-todo = "${id}"> 
                    <button data-todo = "${id}" ${classString2} id="edit" onclick = "Edit(this) "> Edit </button> 
                </span>
            <li>`
        }
    })
    .join("");
}

function Paint(todo){
    $('ul').html(render(todo))
  }

  
 function RemoveList(e){

    console.log('Hello in home1.js file')
    let index = e.dataset.todo;
    const that = e.parentNode.parentNode;
    console.log(that,index);
    todos.splice(index,1);
    console.log(todos);

    fetch('/removeTask', {
        method:'POST',
        headers:new Headers({'content-type':'application/JSON'}),
        body:JSON.stringify({"Todos":todos})
    })
    .then((data)=>{
        console.log(data);
        return data;
        
    })
    .then((data)=>{
        console.log(data);  
        Paint(todos);
    })


}