// This is the example viewer server.
//
// It's purpose is to enable editing the examples
// inside the presentation environment.

var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
var app = express();

app.use(bodyParser.json());
app.use(express.static("."));

app.post("/save", function (req, res){
  var params = req.body.params,
      html = req.body.html,
      directory = path.join(
        "units",
        "unit-" + params.unit,
        "module-" + params.module,
        "example-" + params.example
      ),
      filename = path.join(directory, "index.html");

  mkdirp(directory, function (err) {
    if (err) return res.send(err);
    fs.writeFile(filename, html, function(err) {
      if (err) return res.send(err);
      res.send("Saved!");
    });
  });

  updateIndexJSON();
});

// Updates index.json
function updateIndexJSON(){
  var json = { units: listUnits() },
      jsonStr = JSON.stringify(json, null, 2);
  fs.writeFile("index.json", jsonStr, function(err) {
    if (err) return console.error(err);
    console.log("Updated index.json");
  });
}

function listUnits(){
  var units = fs.readdirSync("units");
  return units.map(function (unit){
    return {
      name: unit,
      modules: listModules(unit)
    };
  });
}

function listModules(unit){
  var modules = fs.readdirSync("units/" + unit);
  return modules.map(function (module){
    return {
      name: module
    };
  });
}

app.listen(3000, function () {
  console.log("Listening at http://localhost:3000");
});
