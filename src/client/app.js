import { select } from "d3-selection";
import { component } from "d3-component";
import router from "./router";
import { header, spacer } from "./header";
import editors from "./editors";
import runner from "./runner";
import keyboard from "./keyboard";
import notifier from "./notifier";

// The main entry point for the application components.
export default component("div")
  .render(function (d){
    select(this)
        .call(router, d)
        .call(keyboard, d)
        .call(header, d.state)
        .call(spacer)
        .call(editors, d)
        .call(runner, d.state)
        .call(notifier, d.state);
  });
