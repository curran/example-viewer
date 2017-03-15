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
  var unitsIndex = {};
  return units.forEach(function (unit){
    unitsIndex[unit] = listModules(unit);
  });
  return unitsIndex;
}

function listModules(unit){
  var modules = fs.readdirSync("units/" + unit);
  return modules.map(function (module){
    return {
      name: module,
      examples: listExamples(unit, module)
    };
  });
}

function listExamples(unit, module){
  var examples = fs.readdirSync("units/" + unit + "/" + module);
  return examples.map(function (example){
    return {
      name: example,
      files: listFiles(unit, module, example)
    };
  });
}

function listFiles(unit, module, example){
  var files = fs.readdirSync("units/" + unit + "/" + module + "/" + example);
  return files.map(function (file){
    return {
      name: file
    };
  });
}

module.exports = updateIndexJSON;
