import { component } from "d3-component";
import { next, previous, save } from "./actions";

export default component("div")
  .create(function ({ dispatch }){
    window.addEventListener("keydown", function (e){
      var CTRL = e.ctrlKey,
          S = e.which === 83,
          RIGHT = e.which === 39,
          LEFT = e.which === 37;
      if(CTRL && S){
        dispatch(save());
        e.preventDefault(); // So the browser doesn't try to save the HTML of the page.
      }
      if(CTRL && RIGHT){
        dispatch(next());
      }
      if(CTRL && LEFT){
        dispatch(previous());
      }
    });
  });

//  // Translates global keyboard events into dispatched actions.
//  function Keyboard(dispatch, actions){
//  }
