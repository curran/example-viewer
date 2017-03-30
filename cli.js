#!/usr/bin/env node

var fs = require("fs");
var path = require("path");

// Copy over the index.html into the project that uses example-viewer.
fs.createReadStream(path.join(__dirname, "index.html"))
  .pipe(fs.createWriteStream("index.html"));

// Launch the server.
require("./src/server/index.js");
