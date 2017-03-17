import { component } from "d3-component";
import { select, local } from "d3-selection";

const codeMirrorLocal = local();

// User interface component for the code editor.
export default component("div", "shadow")
  .create(function (){
    const my = codeMirrorLocal.set(this, {
      codeMirror: CodeMirror(this, {
        lineNumbers: false,
        mode: "htmlmixed"
      }),
      onChange: undefined // Will be set in the render hook.
    });

    my.codeMirror.on("change", function (editor, change){
      if(change.origin === "setValue") return;
      my.onChange && my.onChange(my.codeMirror.getValue());
    });

    // Inlet provides the interactive sliders and color pickers.
    Inlet(my.codeMirror);
  })
  .render(function ({ content, onChange }){
    const my = codeMirrorLocal.get(this);
    if(my.codeMirror.getValue() !== content){ // TODO use timestamp here?
      my.codeMirror.setValue(content);
    }
    my.onChange = onChange;
  });

//export default function (dispatch, actions){
//  return function (selection, state){
//    var editor = selection.selectAll(".editor").data([1]);
//    editor = editor.merge(
//      editor.enter().append("div")
//        .attr("class", "editor shadow")
//        .each(function (){
//        }));
//
//    if(state.html){
//      editor.each(function (){
//      });
//    }
//  };
//}
