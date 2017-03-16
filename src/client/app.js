import { component } from "d3-component";
import router from "./router";
import { header, spacer } from "./header";
import editors from "./editors";

// This component is responsible for the entire app.
export default component("div")
  .render(function (d){
    router(this, d);
    header(this, d.state);
    spacer(this);
    editors(this, d);
  //  .call(editor, state)
  //  .call(runner, state)
  //  .call(notifier, state);
  });
