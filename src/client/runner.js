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
  .render(function ({ source, z }){
    select(this).style("z-index", z);
    if(source){
      select(this).attr("srcdoc", source);
    }
  });

//const previousHtml = "";
//const currentHtml = "";
//const root;
//const needsSwap = false;
const framesPerSecond = 10; // Seems to be the fastest rate without flicker.

const buffers = local();
const filesLocal = local();

export default component("div")
  .create(function (){
    // The notion of double buffering is used to minimize flickering.
    // These constants represent z-index values for iframe buffers.
    const BACK = 3; // CodeMirror's z-index is 2; this will be above that.
    const FRONT = 4; // This is for the "front buffer"; visible to the user.
    buffers.set(this, [BACK, FRONT]);

    setInterval(() => {

      // The existence of these files here
      // indicates that the buffers should be swapped.
      const files = filesLocal.get(this);
      if(files){
        console.log("needs swap");
        console.log(files);

        // Render the content
        const template = files["index.html"].content;
        const source = magicSandbox(template, files);
        iframe(this, { source, z: FRONT });
        //iframe(this, buffers.map(z => {
        //  source: z === BACK ? source : null,
        //  z
        //});

        // Signal that the content has been loaded into a buffer.
        filesLocal.set(this, null);
      }
    }, 1000 / framesPerSecond);
  })
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

      filesLocal.set(this, files);
    }
  });

//  // User interface component for the running example (top right).
//  function Runner(){
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
