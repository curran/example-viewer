import { selection, select, selectAll } from "d3-selection";
import "d3-transition";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { fetchIndex } from "./actions";
import reducer from "./reducer";
import app from "./app";

// Set up Redux.
var store = createStore(reducer, applyMiddleware(thunk));

// Initialize application components.
//    editor = Editor(store.dispatch, actions),
//    runner = Runner(),
//    notifier = Notifier();
//Keyboard(store.dispatch, actions);

// Re-render the application when state changes.
store.subscribe(function (){
  app(document.body, {
    state: store.getState(),
    dispatch: store.dispatch
  })
});

// Kick off the application by fetching the index.json data.
store.dispatch(fetchIndex());

//(function (){
//
//
//
//
//
//
//
//
//
//}());
