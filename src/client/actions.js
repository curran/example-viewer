// Redux action creators.
export default {

  // After navigation occurred (after a route change).
  navigated: function (params){ return { type: "NAVIGATED", params: params }; },

  // When the user wants to go to the next example.
  next: function (){ return { type: "NEXT" }; },

  // When the user wants to go to the previous example.
  previous: function (){ return { type: "PREVIOUS" }; },

  // When the HTML content is changed.
  changeHtml: function (html){
    return { type: "CHANGE_HTML", html: html };
  },

  // Fetches the HTML content from the server (uses thunk middleware).
  fetchHtml: function (){
    return function (dispatch, getState){
      var params = getState().params;
      var url = [
        "units",
        "unit-" + params.unit,
        "module-" + params.module,
        "example-" + params.example,
        "index.html"
      ].join("/");
      d3.request(url).get(function (xhr){
        dispatch(actions.changeHtml(xhr.responseText));;
      });
    }
  },

  // Saves the HTML content to the server (uses thunk middleware).
  save: function (){
    return function (dispatch, getState){
      d3.request("save")
        .header("Content-Type", "application/json")
        .post(JSON.stringify(getState()), function (xhr){
          dispatch(actions.saved(xhr.responseText));
        });
    };
  },
  
  // After a save occurred.
  saved: function (message){
    return { type: "SAVED", message: message, time: Date.now() };
  }
};
