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
  return files ? Object.keys(files).map((name) => ({
    name,
    content: files[name]
  })) : [];
};
