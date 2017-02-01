// This is the example viewer server.
//
// It's purpose is to enable editing the examples
// inside the presentation environment.

var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

app.use(bodyParser.json());
app.use(express.static("."));

app.post("/save", function (req, res){
  console.log(req.body);
  fs.writeFile("example.html", req.body.content, function(err) {
    res.send(err || "ok");
  }); 
});

app.listen(3000, function () {
  console.log("Listening at http://localhost:3000");
});
