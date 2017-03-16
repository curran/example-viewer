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
//  // Translates global keyboard events into dispatched actions.
//  function Keyboard(dispatch, actions){
//    window.addEventListener("keydown", function (e){
//      var CTRL = e.ctrlKey,
//          S = e.which === 83,
//          RIGHT = e.which === 39,
//          LEFT = e.which === 37;
//      if(CTRL && S){ dispatch(actions.save()); e.preventDefault(); }
//      if(CTRL && RIGHT){ dispatch(actions.next()); }
//      if(CTRL && LEFT){ dispatch(actions.previous()); }
//    });
//  }
//
//
//
//
//  // User interface component for the notification overlay (displays "Saved!").
//  function Notifier(){
//    var previousTime = 0;
//    return function (selection, state){
//      selection.selectAll(".overlay").data([1])
//        .enter().append("div").attr("class", "overlay")
//        .append("svg");
//
//      // Trigger the notification based on a changed timestamp.
//      if(state.notify && state.notify.time !== previousTime){
//        var div = selection.select(".overlay").node(),
//            svg = d3.select(div).select("svg"),
//            width = div.clientWidth,
//            height = div.clientHeight,
//            position = state.notify.position || 0.5,
//            size = state.notify.size || 20;
//
//        svg.attr("width", width).attr("height", height);
//
//        var text = svg.selectAll("text").data([1]);
//        text
//          .enter().append("text")
//            .style("text-shadow", "0px 0px 10px white")
//            .attr("text-anchor", "middle")
//            .attr("alignment-baseline", "middle")
//          .merge(text)
//            .interrupt("pop")
//            .attr("x", width * position)
//            .attr("y", height / 2)
//            .attr("font-size", size + "em")
//            .attr("opacity", 1)
//            .text(state.notify.message)
//          .transition("pop").duration(700).ease(d3.easeLinear)
//            .attr("font-size", (size * 1.2) + "em")
//            .attr("opacity", 0);
//
//        previousTime = state.notify.time;
//      }
//    };
//  }
//}());
