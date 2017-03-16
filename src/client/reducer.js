import set from "lodash/fp/set";

// The Redux reducer.
export default function (state, action){
  state = state || {};
  switch (action.type) {
    case "REQUEST_INDEX":
      return Object.assign(state, {
        indexFetching: true
      });
    case "RECEIVE_INDEX":
      return Object.assign(state, {
        indexFetching: false,
        index: action.data
      });
    case "NAVIGATE":
      return Object.assign(state, {
        params: action.params || {
          unit: 1,
          module: 1,
          example: 1
        }
      });
    case "RECEIVE_FILE":
    case "EDIT_FILE":
      return set([
        "index",
        "units", action.params.unit - 1, // Use zero-based index.
        "modules", action.params.module - 1,
        "examples", action.params.example - 1,
        "files", action.filename
      ], action.content, state);
//    case "CHANGE_HTML":
//      return Object.assign(state, {
//        html: action.html
//      });
    case "NEXT":
      return go(state, 1);
//    case "PREVIOUS":
//      return go(state, -1);
//    case "SAVED":
//      return Object.assign(state, {
//        notify: action
//      });
    default:
      return state;
  }
};

// Goes to the next or previous example.
function go(state, increment){
  var FORWARD = (increment === 1);
  return Object.assign(state, {
    // TODO use lodash set?
    params: Object.assign(state.params, {
      example: state.params.example + increment
    })
    //notify: {
    //  message: FORWARD ? "→" : "←",
    //  position: FORWARD ? 0.75 : 0.25,
    //  size: 80,
    //  time: Date.now()
    //}
  });
}
