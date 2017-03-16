import { component } from "d3-component";
import { select } from "d3-selection";

const breadcrumbs = component("div", "header-breadcrumbs")
        .render(function (params){
          select(this).text([
            "Unit " + params.unit,
            "Module " + params.module,
            "Example " + params.example
          ].join(" / "));
        });

// TODO restore the title.
//const title = component("div", "header-title");
  //if(d.html){
  //  header.select(".header-title")
  //    .text(d.html.match(/title>(.*?)</)[1]);
  //}

const spacer = component("div", "header-spacer");

// User interface component for the header text (top left).
const header = component("div", "header")
  .render(function (state){
    breadcrumbs(this, state.params);
    //title(this, state);
  });

export { header, spacer };
