import { component } from "d3-component";
import { next } from "./actions";
//import { next, previous } from "./actions";

export default component("div")
  .create(function ({ dispatch }){
    window.addEventListener("keydown", function (e){
      var CTRL = e.ctrlKey,
          S = e.which === 83,
          RIGHT = e.which === 39,
          LEFT = e.which === 37;
      //if(CTRL && S){
      //  dispatch(actions.save());
      //  e.preventDefault();
      //}
      if(CTRL && RIGHT){
        dispatch(next());
      }
      //if(CTRL && LEFT){
      //  dispatch(actions.previous());
      //}
    });
  });

//  // Translates global keyboard events into dispatched actions.
//  function Keyboard(dispatch, actions){
//  }
