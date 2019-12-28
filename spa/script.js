let arr=[]

$('#add').on('click',function(){
  addTodo();
})

function paint(){
$('ul').html(render(arr))
}

function render(arr){
return arr.map(todo=>{
  let classString=todo.done? `class="striked" `:`class=""`
  return `<li data-todo="${todo.id}" ${classString} draggable="true" ondragover="dragOver(event)" ondragstart="dragStart(event)">${todo.name}<br> ${todo.deadline}
   </li>`
}).join("")
}

$('#reset').on('click',function(){
let len=arr.length
arr.splice(0,len)
paint()
})

$('#bin').on('click',function(){
arr=arr.filter(todo=>!todo.done)
paint();
})

$('ul').on('click',function(e){
  let a = e.target.dataset.todo
  let b = arr.find(todo=>todo.id==a)
  b.done=!b.done
  paint();
})

$('#sort').on('click',function(){
arr.sort(function(a,b){
  return a.deadline-b.deadline
})
paint();
})

function addTodo(){
  let getTask = $('#enter')
  let getDate = $('#tareek')
  if(getTask.val()=='' || getDate.val()== undefined)
  {
    alert("Please fill both values")
  }
  else
  {
    arr.push({
      id:arr.length+1,
      name: getTask.val(),
      done:false,
      deadline:getDate.val()
    })

    paint();
    getTask.val('')
    getDate.val('')
  }
  
}

$('#enter').on("keypress", function (e) {
  if (e.which == 13) {
    addTodo()
  }
})

var _el;

function dragOver(e) {
if (isBefore(_el, e.target))
e.target.parentNode.insertBefore(_el, e.target);
else
e.target.parentNode.insertBefore(_el, e.target.nextSibling);
}

function dragStart(e) {
e.dataTransfer.effectAllowed = "move";
e.dataTransfer.setData("text/plain", null);
_el = e.target;
} 
   

function isBefore(el1, el2) {
if (el2.parentNode === el1.parentNode)
for (var cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
if (cur === el2)
return true;
return false;
} 
  
 
