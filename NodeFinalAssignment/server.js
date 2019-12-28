const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const db = require('./database')

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');

app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000
    }
}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

 app.get('/home',(req,res)=>{
     res.sendFile(__dirname + '/home.html')
 })

// var sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/home');
//     } else {
//         next();
//     }    
// };

let tasks=[]

app.use('/',express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json())
app.use(bodyParser.text())

app.get('/home',(req,res)=>{
    res.sendFile(__dirname + '/home.html')
})

app.post('/login',(req,res)=>{
        // if(req.session.user!=="" ){
        //     res.send(req.session.user);
        //     res.redirect("/home" );
        // }
        // else{
            db.Login(req.body.email,req.body.password,function(result){
       
            if (req.body.email == result.email && req.body.password == result.password) 
            {   
                console.log("Login Successful")
                console.log(result);
                req.session.user=result.email;
                req.session.userId=result._id;
                console.log( req.session.user)
                console.log( req.session.userId)
                res.redirect("/home");        
            } 
            else 
            {    
            console.log("Error in Login")
            res.redirect('/login')
            }
            })
        // }

})
app.get('/login',(req,res)=>{

    res.sendFile(__dirname + '/login.html');
})

app.get('/SignUp',(req,res)=>{
    res.sendFile(__dirname+ '/public/index.html');
})
app.post('/SignUp',(req,res)=>{
    console.log("here in signup 1")
    
    if(req.body.email =="" || req.body.password==""){
        res.redirect('/SignUp')
    }
    else{
               
                var arr=[]
                db.SignUp(req.body.email,req.body.password,req.body.username,arr,req.body.dob,function(result){ 
                // console.log("here in signup ")
                req.session.user=result.email;
                req.session.userId=result._id;
                res.redirect("/login");
                })
            }
           
})


app.post('/MyList',(req,res)=>{
    if(req.session.user=="" ){
        res.redirect("/login");
    }
    else{ 
        db.FindItem(req.session.user,function(result){
            
            console.log(result.TodoArray)
            res.send(result.TodoArray)
        })
    }    
})

app.get('/Logout',(req,res)=>{
    
    req.session.destroy(function(err) {
        
        if(err){
            console.log(err)  
        }
        else{
            res.clearCookie('user_sid');
            res.redirect("/login")
        } 
     })
      
})

app.post("/update", function(req, res) {
    
      let updval = req.body.todos;
  
      // console.log(updval);   
      db.update(updval,req.session.user, function(val) {
       
        res.send(val);
  
        console.log(val);
      })
})

 app.post('/home',(req,res)=>{
     
    if(req.session.user ==""){
        res.redirect("/login")
    }
    else{
        res.redirect("/home")
    }
 })

app.post('/addTask',(req,res)=>{
    console.log("in server addtask");
    let task = req.body.task 
    let user = req.session.user
    let id = req.session.userId
    
    console.log(task,user,id)

    db.addTask(task,user,id,(result)=>{
        console.log("Data Added in server")
        res.send(result)
    }) 
})
app.post('/removeTask',(req,res)=>{
    console.log("in server removeTask");
    let todos = req.body.todos 
    let user = req.session.user
    let id = req.session.userId
    
    console.log(todos,user,id)

    db.removeTask(todos,user,id,(result)=>{
        console.log("Data Removed from server")
        console.log(result)
        res.send(result)
    }) 
})


app.listen(5011,()=>{
    console.log("Server listening on port 5011")
    db.connect();
})