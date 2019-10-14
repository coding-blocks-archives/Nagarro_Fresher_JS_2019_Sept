let MyList = document.querySelector("#MyList")
$("#MyList").on("click",()=>{

    console.log("in MyList file" )
    fetch('/MyList', {
        method:'POST',
        headers:new Headers({'content-type':'application/JSON'}),
        body:JSON.stringify({"user":""})
    })
    .then((data)=>{
        return data.json();
    })
    .then((data)=>{
        console.log(data);
        // todos=data;
        Paint(data);
    })
})