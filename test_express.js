let _express = require("express")
let thisApp = _express()
thisApp.use(_express.urlencoded({extended: false}))

thisApp.get('/', function(req,res){
    res.send(`
    <form action="/answer" method="POST">
        <p>What color is the sky on a clear and sunny day?</p>
        <input name="skyColor" autocomplete="off" type="text">
        <button>Submit</button>
    </form>
    `)
})

thisApp.post("/answer", function(req, res){
    if (req.body.skyColor.toUpperCase() == "BLUE"){
        res.send(`
            <h1 style="color: blue">Congrats! That's the correct answer</h1>
            <a href="/">Back to homepage</a>
        `)
    } else {
        res.send(`
            <h2 style="color: red">I'm sorry! You got it wrong!</h1>
            <a href="/">Back to homepage</a>
        `)
    }
})

thisApp.get("/answer", function(req, res){
    res.send(`
        <h2>Are you lost? There's nothing to see.</h1>
    `)
})

thisApp.listen(3000)