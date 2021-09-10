//INSTALLED PACKAGES SO FAR
//npm install express
//npm install nodemon

//import express
let express = require('express')
//import mongodb
let mongodb  = require('mongodb')

//initialize express
let app = express()

//initialize mongodb
let db
let connectionString = 'mongodb+srv://todoappuser:todoappuser@cluster0.t01yh.mongodb.net/todoapp?retryWrites=true&w=majority'
mongodb.MongoClient.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    db = client.db()
    app.listen(3000)
})

app.use(express.static('public'))

//this make express to add all form values to the body object,
//then add that body object to the req object,
//this makes it easy to access form data (or json in asynchronus request)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res){
    //mongodb way of saying Read or Load -> find()
    db.collection('todolists').find().toArray(function(err, items){
        res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Simple To-Do App</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        </head>
        <body>
          <div class="container">
            <h1 class="display-4 text-center py-1">To-Do App</h1>
            
            <div class="jumbotron p-3 shadow-sm">
              <form action="/add-item" method="POST">
                <div class="d-flex align-items-center">
                  <input name="todoItem" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                  <button class="btn btn-primary">Add New Item</button>
                </div>
              </form>
            </div>
            
            <ul class="list-group pb-5">
                ${items.map(function(i){
                    //this will dynamically load each item from the mongodb database
                    //the 'i' holds the value from the array
                    //the .join() will separate each item by empty space
                    return `
                    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                        <span class="item-text">${i.text}</span>
                        <div> 
                            <button data-id="${i._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                            <button class="delete-me btn btn-danger btn-sm">Delete</button>
                        </div>
                    </li>
                    `
                }).join('')}
            </ul>
            
          </div>
          <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
          <script src="/browser.js"></script>  
        </body>
        </html>
        `)  
    })
})

//this listener will response to the user
//everytime new todo item is added
app.post('/add-item', function(req, res){
    //CRUD
    //INSERT
    db.collection("todolists").insertOne({text: req.body.todoItem}, function(){
        //res.send("this listener is working")
        //this redirects back to home everytime an item is added
        res.redirect('/')
    })
})

app.post('/update-todolists', function(req, res){
    //CRUD
    //UPDATE

    //this will receive the the request from axios.
    //containing the id of the item and the user input from the prompt
    db.collection("todolists").findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {text: req.body.text}}, function(){
        res.send("Success")
    })
})

//app.listen(3000)
//Transferred was inside mongdo db anonymous function body
//to make sure that app will only listen after the
//connection to the database is established.