// User interface component for the header text (top left).
export default function (selection, state){

  // TODO migrate to d3-component in here.
  var header = selection.selectAll(".header").data([1]);
  var headerEnter = header.enter().append("div").attr("class", "header");
  headerEnter.append("div").attr("class", "header-breadcrumbs");
  headerEnter.append("div").attr("class", "header-title");
  header = header.merge(headerEnter);

  selection.selectAll(".header-spacer").data([1])
    .enter().append("div").attr("class", "header-spacer");

  if(state.params){
    header.select(".header-breadcrumbs")
      .text([
        "Unit " + state.params.unit,
        "Module " + state.params.module,
        "Example " + state.params.example
      ].join(" / "));
  }

  // TODO restore this.
  //if(state.html){
  //  header.select(".header-title")
  //    .text(state.html.match(/title>(.*?)</)[1]);
  //}
}
