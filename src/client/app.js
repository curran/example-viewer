import { component } from "d3-component";
import router from "./router";
import { header, spacer } from "./header";
import editor from "./editor";
import getFiles from "./getFiles";

export default component("div")
  .render(function (d){
    router(this, d);
    header(this, d.state);
    spacer(this);
    editor(this, getFiles(d.state));
  //  .call(editor, state)
  //  .call(runner, state)
  //  .call(notifier, state);
  });
