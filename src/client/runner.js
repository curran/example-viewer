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

const framesPerSecond = 6; // Seems to be the fastest rate without flicker.
const filesLocal = local();

export default component("div")
  .create(function (){
    // The notion of double buffering is used to minimize flickering.
    // These constants represent z-index values for iframe buffers.
    const BACK = 4; // The header z-index is 3; this will be above that.
    const FRONT = 5; // This is for the "front buffer"; visible to the user.
    let buffers = [{ z: BACK }, { z: FRONT }];
    let needsSwap = false;

    setInterval(() => {

      // Swap the z-index of buffers if needed.
      if(needsSwap){
        buffers = buffers.reverse();
        iframe(this, buffers);
        needsSwap = false;
      }

      // The existence of a value in filesLocal
      // indicates that the content has changed.
      const files = filesLocal.get(this);

      // Set the content of the back buffer
      // if the content has changed.
      if(files){

        // Set the content of the back buffer.
        const template = files["index.html"].content;
        const source = magicSandbox(template, files);
        iframe(this, buffers.map(buffer => Object.assign({}, buffer, {
          source: buffer.z === BACK ? source : null
        })));

        // Signal that buffers should be swapped on the next frame.
        needsSwap = true;

        // Signal that the content has been rendered into a buffer.
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
