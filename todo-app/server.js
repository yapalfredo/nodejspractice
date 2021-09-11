//INSTALLED PACKAGES SO FAR
//npm install express
//npm install nodemon

//import express
const { json } = require("express");
let express = require("express");
//import mongodb
let mongodb = require("mongodb");

//initialize express
let app = express();

//initialize mongodb. Settings from mongodb dashboard connections
let db;
let connectionString =
  "mongodb+srv://todoappuser:todoappuser@cluster0.t01yh.mongodb.net/todoapp?retryWrites=true&w=majority";
mongodb.MongoClient.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db();
    app.listen(3000);
  }
);

app.use(express.static("public"));

//this make express to add all form values to the body object,
//then add that body object to the req object,
//this makes it easy to access form data (or json in asynchronus request)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function passwordProtected(req, res, next) {
  res.set("WWW-Authenticate", 'Basic realm="Simple Todo App"');
  if (req.headers.authorization == "Basic bm9kZWpzOm5vZGVqcw==") {
    next();
  } else {
      res.status(401).send("Authentication Required!")
  }
}

//This will tell express to use this function for all routes
app.use(passwordProtected)

//HOMEPAGE
app.get("/",  function (req, res) {
  //mongodb way of saying Read or Load -> find()
  db.collection("todolists")
    .find()
    .toArray(function (err, items) {
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
              <form id="formNewTask" action="/create-todolists" method="POST">
                <div class="d-flex align-items-center">
                  <input id="inputNewTask" name="todoItem" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                  <button class="btn btn-primary">Add New Item</button>
                </div>
              </form>
            </div>
            
            <ul id="listToDos" class="list-group pb-5"></ul>
            
          </div>
          <script>
            <!-- This will render the todos item locally -->
            let items = ${JSON.stringify(items)}
          </script>
          
          <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
          <script src="/browser.js"></script>  
        </body>
        </html>
        `);
    });
});

//this listener will response to the user
//everytime new todo item is added
app.post("/create-todolists", function (req, res) {
  //CRUD
  //INSERT
  db.collection("todolists").insertOne(
    { text: req.body.text },
    function (err, info) {
      if (err) {
        console.log("error occured while inserting");
      } else {
        //Tutorial doesn't work anymore so I needed to improvise
        //This will create a new object with _id: and text fields
        let newlyInsertedInfo = {
          _id: info.insertedId,
          text: req.body.text,
        };
        //This send back a response containing the newly created info
        res.json(newlyInsertedInfo);
      }
    }
  );
});

app.post("/update-todolists", function (req, res) {
  //CRUD
  //UPDATE

  //this will receive the the request from axios.
  //containing the id of the item and the user input from the prompt
  db.collection("todolists").findOneAndUpdate(
    { _id: new mongodb.ObjectId(req.body.id) },
    { $set: { text: req.body.text } },
    function () {
      res.send("Success");
    }
  );
});

app.post("/delete-todolists", function (req, res) {
  //CRUD
  //DELETE
  db.collection("todolists").deleteOne(
    { _id: new mongodb.ObjectId(req.body.id) },
    function () {
      res.send("Success");
    }
  );
});

//app.listen(3000)
//Transferred was inside mongdo db anonymous function body
//to make sure that app will only listen after the
//connection to the database is established.
