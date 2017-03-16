import { json, request } from "d3-request";
import { getFiles } from "./getFiles";

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

// See redux.js.org/docs/advanced/AsyncActions.html
//function fetchFilesIfNeeded(params){
//  return function (dispatch, getState){
//    if(shouldFetchFiles(getState(), params)){
//      dispatch(fetchFiles(params));
//    }
//  };
//};
//
//function shouldFetchFiles(state, params){
//  return get(state, ["units", params.unit, params.module, params.example, "files"]);
//}


function fetchFiles(params){
  return function (dispatch, getState){
    const state = getState();
    const files = getFiles(state);
    if(files){
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
    d3.request(url).get(function (xhr){
      dispatch(receiveFile(params, filename, xhr.responseText));;
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
  console.log("Next action!");
  return { type: "NEXT" };
};
//
//  // When the user wants to go to the previous example.
//  previous: function (){ return { type: "PREVIOUS" }; },
//
//  // When the HTML content is changed.
//  changeHtml: function (html){
//    return { type: "CHANGE_HTML", html: html };
//  },
//
//  // Fetches the HTML content from the server (uses thunk middleware).
//  fetchHtml: function (){
//    return function (dispatch, getState){
//      var params = getState().params;
//      var url = [
//        "units",
//        "unit-" + params.unit,
//        "module-" + params.module,
//        "example-" + params.example,
//        "index.html"
//      ].join("/");
//      d3.request(url).get(function (xhr){
//        dispatch(actions.changeHtml(xhr.responseText));;
//      });
//    }
//  },
//
//  // Saves the HTML content to the server (uses thunk middleware).
//  save: function (){
//    return function (dispatch, getState){
//      d3.request("save")
//        .header("Content-Type", "application/json")
//        .post(JSON.stringify(getState()), function (xhr){
//          dispatch(actions.saved(xhr.responseText));
//        });
//    };
//  },
//  
//  // After a save occurred.
//  saved: function (message){
//    return { type: "SAVED", message: message, time: Date.now() };
//  }

