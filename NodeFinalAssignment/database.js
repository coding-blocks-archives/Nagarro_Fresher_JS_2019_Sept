const mongoDb = require('mongodb').MongoClient;
const mongodb = require('mongodb');
//const url =`mongodb+srv://GurpinderjitSingh:gurpinder@cluster0-mps8z.mongodb.net/test?retryWrites=true&w=majority`;
const url=`mongodb+srv://karan:BeingMdb@cluster0-hqaeg.mongodb.net/test?retryWrites=true&w=majority`;
let collection = "";
var dbname = "todo";

function connect() {
   mongoDb.connect(url ,{ useNewUrlParser: true }, { useUnifiedTopology: true }, function (err, client) {
            console.log('connected sucessfully to the server');
            var db = client.db(dbname)
            collection = db.collection("todoList");            
        
})
}
function SignUp(task1,task2,task3,arr,dob,cb){
    collection.insertOne({'email':task1,'password':task2,'username':task3,"dob":dob,"TodoArray":arr} , function(err,result){
            if(err){
                console.log(err)
            }
           else {
               cb(result);
            }
    })
}

function FindItem(email,cb){
    collection.findOne({'email':email},function(err,result){
            if(err){
                console.log(err)
            }
           else {
               if(result!==null){
                    cb(result);
               }
            }
    })
}

function Login(task1,task2,cb){
    collection.findOne({'email':task1} , function(err,result){
            if(err){
                console.log(err)
            }
            else{
                cb(result);
            }
    })
}

function addTask(task,user,id,cb){
    // console.log("In database",task,user,id)
    collection.findOne({'email':`${user}`},function(err,result){
        // console.log(result);
        if(err){
            console.log(err)
        }
        else {
            var Taskarr=[]
            Taskarr.push(task);
           
            // console.log("TaskArray "+Taskarr)
            // console.log("Result ",result)
            // console.log(result._id)
            // console.log(result.email)
            // console.log(result.username)
            if(result == null){
                collection.updateOne({"email": user },
                { $set: {"TodoArray":Taskarr }})
            }
            else{
                var Taskarr2 = result.TodoArray;
                // console.log(Taskarr2)

                var newArray = Taskarr.concat(Taskarr2);
                // console.log(newArray)
                collection.updateOne({"email": user },
                { $set: {"TodoArray":newArray }} )
               
                cb(newArray)
            } 
        }
})
}

function update(val, email, cb) {
    collection.updateOne(
      { "email": email },
      { $set: { "TodoArray": val } },
      function(err, result) {
        if (!err) {
          cb(val);
        } else {
          console.log("err");
        }
      }
    )
  }

function removeTask(todos,user,id,cb){
    console.log("In database",todos,user,id)
    collection.findOne({'email':`${user}`},function(err,result){
        console.log(result);
        if(err){
            console.log(err)
        }
        else {
            // var Taskarr=[]
            // Taskarr.push(task);
           
            console.log("Result ",result)
            console.log(result._id)
            console.log(result.email)
            console.log(result.username)
           
            // var Taskarr2 = result.TodoArray;
            // console.log(Taskarr2)
            // Taskarr2.Splice
            // var newArray = Taskarr.concat(Taskarr2);
            // console.log(newArray)
            console.log()
            collection.updateOne({"email": user },
            { $set: {"TodoArray":todos }} )
            
            cb(todos)
            } 
})
}



module.exports={
    connect,
    SignUp,
    Login,
    FindItem,
    addTask,
    removeTask,
    update
}