import { json } from "d3-request";
import get from "lodash-es/get";

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
    const { index, params } = getState();
    if(index && params){
      getFiles(index, params).forEach(function (file){
        console.log(params, file);
        dispatch(fetchFile(params, file.name));
      });
    }
  };
}

// Gets the listing of file entries for the current example.
function getFiles(index, params){
  return get(index, [
    "units", params.unit - 1, // Use zero-based index.
    "modules", params.module - 1,
    "examples", params.example - 1,
    "files"
  ]);
}

function fetchFile(params, file){
}

//
//  // When the user wants to go to the next example.
//  next: function (){ return { type: "NEXT" }; },
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

