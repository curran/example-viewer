import { component } from "d3-component";
import { select, local } from "d3-selection";

const codemirror = local();

// User interface component for the code editor.
export default component("pre")
  .render(function ({ content, onChange}){
    d3.select(this).text(content);
  });

//export default function (dispatch, actions){
//  return function (selection, state){
//    var editor = selection.selectAll(".editor").data([1]);
//    editor = editor.merge(
//      editor.enter().append("div")
//        .attr("class", "editor shadow")
//        .each(function (){
//          var cm = CodeMirror(this, {
//            lineNumbers: false,
//            mode: "htmlmixed"
//          });
//
//          // Inlet provides the interactive sliders and color pickers.
//          Inlet(cm);
//
//          cm.on("change", function (editor, change){
//            if(change.origin === "setValue") return;
//            dispatch(actions.changeHtml(cm.getValue()));
//          });
//
//          codemirror.set(this, cm);
//        }));
//
//    if(state.html){
//      editor.each(function (){
//        var cm = codemirror.get(this);
//        if(cm.getValue() !== state.html){
//          cm.setValue(state.html);
//        }
//      });
//    }
//  };
//}
