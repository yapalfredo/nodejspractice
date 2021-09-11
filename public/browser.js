//We use axios library to do asynchronus tasks to MongoDB

//will store the value that was inputted by the user
let inputField = document.getElementById("inputNewTask")

//This function will be used to populate or read the list of todos
function listTemplate(i){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${i.text}</span>
            <div> 
                <button data-id="${i._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                <button data-id="${i._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
            </li>`
}

// Inital Page Load Rendering
let initialHTML =  items.map(function(initalList){
    return listTemplate(initalList)
}).join('')

document.getElementById("listToDos").insertAdjacentHTML("beforeend", initialHTML)

//CREATE FEATURE
document.getElementById("formNewTask").addEventListener("submit", function(e){
    e.preventDefault()
    axios.post('/create-todolists', {text: inputField.value}).then(function(response) {
        //Will create html for the new item
        document.getElementById("listToDos").insertAdjacentHTML("beforeend", listTemplate(response.data))
        inputField.value = ""
        inputField.focus()
    }).catch(function(){
        console.log("Something error happened during inserting document")
    })
})

document.addEventListener("click", function(e){
    //UPDATE FEATUREE
    if (e.target.classList.contains("edit-me")){
        let userInput = prompt("Enter the new desired todo task")
        //axios library
        //This will return a PROMISE
        //access will send the text input and the data-id attribute to the server

        //the if statement will make sure to make only updates when an input is not empty and when the user hit "ok"
        if (userInput){
            axios.post('/update-todolists', {text: userInput, id: e.target.getAttribute("data-id")}).then(function() {
                //Once the mongodb finishes updating the database......
                //this will update the text value in the <span> tag holding the name of the item
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(function(){
                console.log("Something error happened during updation of the todos")
            })
        }
    }

    //DELETE FEATURE
    if (e.target.classList.contains("delete-me")){
        if(confirm("Do you really want to remove this task?")){
            axios.post('/delete-todolists', {id: e.target.getAttribute("data-id")}).then(function() {
                //This will remove item from HTML after MongoDB is done processing on its end
                e.target.parentElement.parentElement.remove()
            }).catch(function(){
                console.log("Something error happened during the deletion of the todos")
            })
        }
    }
})