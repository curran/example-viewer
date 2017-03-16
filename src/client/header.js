import { component } from "d3-component";
import { select } from "d3-selection";

const breadcrumbs = component("div", "header-breadcrumbs")
        .render(function (params){
          select(this).text([
            "Unit " + params.unit,
            "Module " + params.module,
            "Example " + params.example
          ].join(" / "));
        }),
      spacer = component("div", "header-spacer");

// TODO restore the title.
//const title = component("div", "header-title");
  //if(d.html){
  //  header.select(".header-title")
  //    .text(d.html.match(/title>(.*?)</)[1]);
  //}

// User interface component for the header text (top left).
export default component("div", "header")
  .render(function (state){
    breadcrumbs(this, state.params);
    spacer(this);
    //title(this, state);
  });
