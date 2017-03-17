import { json, request } from "d3-request";
import { getFiles, getLoadedFiles } from "./getFiles";

// Redux action creators.

// Fetches index.json from the server (uses thunk middleware).
export function fetchIndex(){
  return function (dispatch, getState){
    dispatch(requestIndex());
    json("index.json", function (data){
      dispatch(receiveIndex(data));;
    });
  };
};

// As the fetching begins (request gets sent off);
export function requestIndex(){
  return { type: "REQUEST_INDEX" };
};

// After the index was fetched.
export function receiveIndex(data){
  return function (dispatch){
    dispatch({
      type: "RECEIVE_INDEX",
      data: data
    });
    //dispatch(fetchFilesIfNeeded(params));
    dispatch(fetchFiles());
  }
};

// Navigation between examples (route change).
export function navigate(params){
  return function (dispatch){
    dispatch({
      type: "NAVIGATE",
      params: params
    });
    //dispatch(fetchFilesIfNeeded(params));
    dispatch(fetchFiles());
  };
};

function fetchFiles(params){
  return function (dispatch, getState){
    const state = getState();
    const files = getFiles(state);
    const loaded = getLoadedFiles(state);
    if(files && !loaded){
      Object.keys(files).forEach(function (filename){
        dispatch(fetchFile(state.params, filename));
      });
    }
  };
}

function fetchFile(params, filename){
  return function (dispatch, getState){
    var url = [
      "units",
      "unit-" + params.unit,
      "module-" + params.module,
      "example-" + params.example,
      filename
    ].join("/");
    request(url).get(function (xhr){
      dispatch(receiveFile(params, filename, xhr.responseText.trim()));;
    });
  };
}

function receiveFile(params, filename, content){
  return {
    type: "RECEIVE_FILE",
    params: params,
    filename: filename,
    content: content
  };
}

export function editFile(params, filename, content){
  return {
    type: "EDIT_FILE",
    params: params,
    filename: filename,
    content: content
  };
};

// When the user wants to go to the next example.
export function next(){
  return { type: "NEXT" };
};

// When the user wants to go to the previous example.
export function previous(){
  return { type: "PREVIOUS" };
};

// Saves the HTML content to the server (uses thunk middleware).
export function save(){
  return function (dispatch, getState){
    const state = getState();
    const payload = {
      params: state.params,
      files: getFiles(state)
    };
    request("save")
      .header("Content-Type", "application/json")
      .post(JSON.stringify(payload), function (xhr){
        //console.log(xhr.responseText);
        dispatch(saved(xhr.responseText));
      });
  };
}

// After a save occurred.
function saved(message){
  return {
    type: "SAVED",
    message: message,
    time: Date.now()
  };
}

// The user wants to insert a new example
// that is a copy of the current example.
export function insert(){
  return { type: "INSERT" };
}

