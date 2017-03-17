#!/usr/bin/env node

// Copy over the index.html
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

fs.createReadStream(path.join(__dirname, "index.html"))
  .pipe(fs.createWriteStream("index.html"));

mkdirp("example-viewer-dist", function (err) {
  fs.createReadStream(path.join(__dirname, "bundle.min.js"))
    .pipe(fs.createWriteStream(path.join("example-viewer-dist", "index.html"));
  fs.createReadStream(path.join(__dirname, "styles.css"))
    .pipe(fs.createWriteStream(path.join("example-viewer-dist", "styles.css"));
});

// Launch the server.
require("./index.js");
