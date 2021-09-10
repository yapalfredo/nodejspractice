//We use axios library to do asynchronus tasks to MongoDB

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
                console.log("Something error happened")
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
                console.log("Something error happened")
            })
        }
    }
})