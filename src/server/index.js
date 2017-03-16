// This is the example viewer server.
//
// It's purpose is to enable editing the examples
// inside the presentation environment.

var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
var updateIndexJSON = require("./updateIndexJSON");
var app = express();

app.use(bodyParser.json());
app.use(express.static("."));

app.post("/save", function (req, res){
  const params = req.body.params,
        files = req.body.files,
        fileNames = Object.keys(files);

  fileNames.forEach(function (fileName){
    const directory = path.join(
            "units",
            "unit-" + params.unit,
            "module-" + params.module,
            "example-" + params.example
          ),
          filePath = path.join(directory, fileName),
          content = files[fileNames];

    mkdirp(directory, function (err) {
      if (err) return res.send(err);
      fs.writeFile(filePath, content, function(err) {
        if (err) return res.send(err);
        res.send("Saved!");
      });
    });
  });


  updateIndexJSON();
});

app.listen(3000, function () {
  console.log("Listening at http://localhost:3000");
});
