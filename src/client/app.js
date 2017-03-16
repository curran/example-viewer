import { component } from "d3-component";
import header from "./header";
import editor from "./editor";
import getFiles from "./getFiles";

export default component("div")
  .render(function (state){
    header(this, state);
    editor(this, getFiles(state));
  //  .call(editor, state)
  //  .call(runner, state)
  //  .call(notifier, state);
  });
