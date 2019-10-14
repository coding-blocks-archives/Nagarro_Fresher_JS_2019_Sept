(function(){

var email=document.querySelector("#email");
var pass=document.querySelector("#pass");
var btn=document.querySelector("#btn");

email.focus();

$("#btn").on('click',function(){
    Login();
})

function Login(){
    let emailVal=email.value;
    let passVal=pass.value;

    fetch('/login',{
        method:'POST',
        headers:new Headers({'content-type':'application/JSON'}),
        body:JSON.stringify({"email":emailVal,"password":passVal})
    })
    .then((data)=>{
       
        return data.text();
    // }
    //     return data.text();
    })
    .then((data)=>{
       email.value =data;
    })
}
})()