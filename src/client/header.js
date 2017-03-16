import { component } from "d3-component";
import { select } from "d3-selection";
import { getLoadedFiles } from "./getFiles";

const breadcrumbs = component("div", "header-breadcrumbs")
  .render(function (params){
    select(this).text([
      "Unit " + params.unit,
      "Module " + params.module,
      "Example " + params.example
    ].join(" / "));
  });

const title = component("div", "header-title")
  .render(function (d){
    const files = getLoadedFiles(d);
    if(files){
      const html = files["index.html"];
      d3.select(this).text(extractTitle(html));
    }
  });

function extractTitle(html) {
  const matches = html.match(/title>(.*?)</);
  return matches ? matches[1] : "Untitled";
}

const spacer = component("div", "header-spacer");

// User interface component for the header text (top left).
const header = component("div", "header")
  .render(function (state){
    breadcrumbs(this, state.params);
    title(this, state);
  });

export { header, spacer };
