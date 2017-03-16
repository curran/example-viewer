import get from "lodash/get";

// Gets the listing of file entries for the current example.
export default function ({ index, params }){
  return get(index, [
    "units", params.unit - 1, // Use zero-based index.
    "modules", params.module - 1,
    "examples", params.example - 1,
    "files"
  ]);
};
