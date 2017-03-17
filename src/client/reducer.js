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
    case "NEXT":
      return go(state, 1);
    case "PREVIOUS":
      return go(state, -1);
    case "SAVED":
      return set("notify", action, state);
    default:
      return state;
  }
};

// Goes to the next or previous example.
function go(state, increment){

  // Update the example param in the state.
  const example = state.params.example + increment;
  state = set("params.example", example, state);

  // Update the notification in the state.
  const FORWARD = (increment === 1);
  return set("notify", {
    message: FORWARD ? "→" : "←",
    position: FORWARD ? 0.75 : 0.25,
    size: 40,
    time: Date.now()
  }, state);
}
