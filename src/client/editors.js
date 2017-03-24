import { select } from "d3-selection";
import { component } from "d3-component";
import editor from "./editor";
import { getFilesSorted } from "./getFiles";
import { editFile } from "./actions";

const label = component("div", "editor-filename-label")
  .render(function (text){

    // Workaround for GitHub Pages not hosting dotfiles.
    if(text === "babelrc.json"){
      text = ".babelrc";
    }

    select(this).text(text);
  });

const labeledEditor = component("div")
  .render(function ({ name, content, state, dispatch}){
    label(this, name);
    editor(this, {
      content: content,
      onChange: function (newContent){
        dispatch(editFile(state.params, name, newContent));
      }
    });
  });

export default component("div")
  .render(function (d){
    labeledEditor(this, getFilesSorted(d.state), d);
  });
