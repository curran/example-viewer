// This is the example viewer server.
//
// It's purpose is to enable editing the examples
// inside the presentation environment.

var express = require("express");
var app = express();

app.use(express.static("."));

app.listen(3000, function () {
  console.log("Listening at http://localhost:3000");
});
