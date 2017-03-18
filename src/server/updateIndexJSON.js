var fs = require("fs");
var path = require("path");
var twoDigits = d3.format("02.0f");

function updateIndexJSON(){
  var json = {
        units: listUnits("units")
      },
      jsonStr = JSON.stringify(json, null, 2);
  fs.writeFile("index.json", jsonStr, function(err) {
    if (err) return console.error(err);
    console.log("Updated index.json");
  });
}

function renameIfNeeed(dir){
  return function (name){
    var split= name.split("-");

    // If convention is like "unit-1".
    if(split[1].length === 1){

      // Rename to convention like "unit-01".
      split[1] = "0" + split[1];
      var oldName = name;
      name = split.join("-");
      fs.renameSync(path.join(dir, oldName), path.join(dir, name));
    }
    return name;
  };
}

function listUnits(dir){
  var units = fs.readdirSync(dir)
    .map(renameIfNeeed(dir));
  return units.map(function (unit){
    return {
      name: unit,
      modules: listModules(path.join(dir, unit))
    };
  });
}

function listModules(dir){
  var modules = fs.readdirSync(dir)
    .map(renameIfNeeed(dir));
  return modules.map(function (module){
    return {
      name: module,
      examples: listExamples(path.join(dir, module))
    };
  });
}

function listExamples(dir){
  var examples = fs.readdirSync(dir)
    .map(renameIfNeeed(dir));
  return examples.map(function (example){
    return {
      name: example,
      files: listFiles(path.join(dir, example))
    };
  });
}

function listFiles(dir){
  var files = fs.readdirSync(dir);
  var filesIndex = {};
  files.forEach(function (file){
    filesIndex[file] = false;
  });
  return filesIndex;
}

module.exports = updateIndexJSON;
