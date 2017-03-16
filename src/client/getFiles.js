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

// Gets the listing of files as an array of objects.
export function getFilesSorted(state){
  const filesDictionary = getFiles(state);
  console.log(filesDictionary);
  if(filesDictionary){
    return Object.keys(filesDictionary)
      .map((name) => ({
        name,
        content: filesDictionary[name]
      }))
      .filter((d) => d.content);
  }
  return [];
};
