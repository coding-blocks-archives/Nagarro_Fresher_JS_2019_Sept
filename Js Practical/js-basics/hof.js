function GetGreeting(name){
    function insider(greet){
        console.log(greet+' ' + name);
    }
    return insider;
}

let gm=GetGreeting('goodmorning')