let express = require('express')

//initialize express
let app = express()

//this make express to add all form values to the body object,
//then add that body object to the req object,
//this makes it easy to access form data.
app.use(express.urlencoded({extended: false}))

app.get("/", function(req, res){
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
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #1</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #2</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #3</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
        </ul>
        
      </div>
      
    </body>
    </html>
    `)
})

app.post("/add-item", function(req, res){
    console.log(req.body.todoItem)
    res.send("this listener is working")
})

app.listen(3000)