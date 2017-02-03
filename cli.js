#!/usr/bin/env node

// Copy over the index.html
var fs = require("fs");
var path = require("path");
fs.createReadStream(path.join(__dirname, "index.html"))
  .pipe(fs.createWriteStream("index.html"));

// Launch the server.
require("./index.js");
