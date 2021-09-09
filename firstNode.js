let http = require("http")

let thisApp = http.createServer(function(req, res){
    if (req.url == "/"){
        res.end("Hello, and welcome to our website.")
    }
    if (req.url == "/about"){
        res.end("Thank you for your interest in our company")
    }

    res.end("We cannot find the page you are looking for.")
})
thisApp.listen(3000)