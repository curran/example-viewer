function twoDigits(number){
  return number.toString().length === 1 ? "0" + number : number;
}

module.exports = function (params){
  return [
    "units",
    "unit-" + twoDigits(params.unit),
    "module-" + twoDigits(params.module),
    "example-" + twoDigits(params.example)
  ].join("/");
};
