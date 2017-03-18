import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { fetchIndex } from "./actions";
import reducer from "./reducer";
import app from "./app";

// Set up Redux.
var store = createStore(reducer, applyMiddleware(thunk));

// Re-render the application when state changes.
store.subscribe(function (){
  app(document.body, {
    state: store.getState(),
    dispatch: store.dispatch
  })
});

// Kick off the application by fetching the index.json data.
store.dispatch(fetchIndex());
