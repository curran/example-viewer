import get from "lodash/get";

// Gets the listing of file entries for the current example.
export function getFiles({ index, params }){
  return get(index, [
    "units", params.unit - 1, // Use zero-based index.
    "modules", params.module - 1,
    "examples", params.example - 1,
    "files"
  ]);
};

// Gets the listing of file entries for the current example,
// but returns an empty object if not all of the files have loaded yet.
export function getLoadedFiles(state){
  const files = getFiles(state);
  const loaded = files && Object.keys(files)
    .every(function (name){
      return files[name]; // The value is "false" if it hasn't loaded yet.
    });
  return loaded ? files : undefined;
}

// Gets the listing of files as an array of objects.
export function getFilesSorted(state){
  const files = getLoadedFiles(state);
  if(files){
    const filesArr = Object.keys(files)
      .map((name) => ({
        name,
        content: files[name]
      }));
    filesArr.sort(fileComparator);
    return filesArr;
  } else {
    return [];
  }
};

function fileComparator(a, b){
  return filePrecedence(a) - filePrecedence(b);
}

function filePrecedence({name}){
  var ext = name.substr(name.lastIndexOf('.'));

  if(name === 'index.html'){
    return 0;
  } else if (ext === '.html') {
    return 1;
  } else if (ext === '.js') {
    return 2;
  } else if (ext === '.json') {
    return 3;
  } else if (ext === '.csv') {
    return 4;
  } else {
    return 5;
  }
}
