import { select, local } from "d3-selection";
import { component } from "d3-component";
import { getLoadedFiles } from "./getFiles";
import magicSandbox from "magic-sandbox";

const iframe = component("iframe", "shadow runner")
  .create(function (){
    select(this)
        .attr("width", "960") // 960 X 500 is standard for bl.ocks.org.
        .attr("height", "500")
        .attr("marginwidth", "0") // Have no margin to match with bl.ocks.org.
        .attr("marginheight", "0")
        .attr("frameborder", "0px") // We'll have a shadow instead of a border.
        .attr("scrolling", "no"); // Disable scrolling to match with bl.ocks.org.
  })
  .render(function ({ source, z}){
    select(this)
        .attr("srcdoc", source)
        .style("z-index", z);
  });

// TODO fix flickering.
//const buffers = local();

export default component("div")
  //.create(function (){
  //  
  //})
  .render(function (state){
    const loadedFiles = getLoadedFiles(state);
    if(loadedFiles){

      // Transform into the format that magicSandbox expects.
      // TODO make this the overall format? Seems better, more explicit.
      const files = {};
      Object.keys(loadedFiles).forEach(function (name){
        files[name] = {
          content : loadedFiles[name]
        };
      });

      const template = loadedFiles["index.html"];
      const source = magicSandbox(template, files);
      iframe(this, {source, z: 4});
    }
  });

//  // User interface component for the running example (top right).
//  function Runner(){
//    var previousHtml = "",
//        currentHtml = "",
//        BACK = 3, // CodeMirror's z-index is 2, this will be above that.
//        FRONT = 4, // This is for the "front buffer", visible to the user.
//        buffers = [BACK, FRONT],
//        root,
//        needsSwap = false,
//        framesPerSecond = 10; // Seems to be the fastest rate without flicker.
//
//    setInterval(function (){
//      if(root){
//        if(needsSwap){
//          buffers = buffers.reverse();
//          root.selectAll(".runner").data(buffers)
//            .style("z-index", function (z) { return z; });
//          needsSwap = false;
//        }
//        if(currentHtml !== previousHtml){
//          previousHtml = currentHtml;
//          root.selectAll(".runner")
//            .filter(function (z){ return z === BACK; })
//            .attr("srcdoc", currentHtml);
//          needsSwap = true;
//        }
//      }
//    }, 1000 / framesPerSecond);
//
//    return function (selection, state){
//      root = selection;
//      root.selectAll(".runner").data(buffers)
//        .enter().append("iframe")
//      currentHtml = state.html;
//    };
//  }
