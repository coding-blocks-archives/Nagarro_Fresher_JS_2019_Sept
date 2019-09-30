function count(){
    var initial=1;
    function plus(){
        console.log(++initial);
    }
    return plus;
}

var c=count();
c();
c();