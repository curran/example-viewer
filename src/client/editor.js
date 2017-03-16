import { component } from "d3-component";
import { select, local } from "d3-selection";

const codeMirrorLocal = local();

// User interface component for the code editor.
export default component("div", "shadow")
  .create(function ({ onChange }){
    const codeMirror = codeMirrorLocal
      .set(this, CodeMirror(this, {
        lineNumbers: false,
        mode: "htmlmixed"
      }));

    // Inlet provides the interactive sliders and color pickers.
    Inlet(codeMirror);

    codeMirror.on("change", function (editor, change){
      if(change.origin === "setValue") return;
      onChange(codeMirror.getValue());
      //dispatch(actions.changeHtml(cm.getValue()));
    });
  })
  .render(function ({ content }){
    const codeMirror = codeMirrorLocal.get(this);
    if(codeMirror.getValue() !== content){ // TODO use timestamp here?
      codeMirror.setValue(content);
    }
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
