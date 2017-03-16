import { select } from "d3-selection";
import { component } from "d3-component";
import editor from "./editor";
import { getFilesSorted } from "./getFiles";

const label = component("div", "editor-label");

const labeledEditor = component("div")
  .render(function ({ name, content, state, dispatch}){
    label(this).text(name);
    editor(this, {
      content: content,
      onChange: function (newContent){
        console.log(state.params, name, newContent);
        //d.dispatch(contentChange(d.params, d.name, content));
      }
    });
  });

export default component("div")
  .render(function (d){
    labeledEditor(this, getFilesSorted(d.state), d);
  });
