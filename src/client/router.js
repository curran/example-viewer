import { component } from "d3-component";
import { navigate } from "./actions";

// Deals with the route, kept in the fragment identifier.
export default component("div", "router")
  .create(function ({ dispatch }){
    navigateFromHash();
    window.addEventListener("hashchange", navigateFromHash);
    function navigateFromHash(){
      dispatch(navigate(parseHash()));
    }
  })
  .render(function ({ state }){
    var newHash = encodeHash(state.params);
    if(location.hash != newHash){
      location.hash = newHash;
    }
  });

function encodeHash(params){
  return "#" + params.unit + "/" + params.module + "/" + params.example;
}

function parseHash(){
  var path = location.hash.substr(1).split("/");
  if(path.length === 3){
    return {
      unit: +path[0],
      module: +path[1],
      example: +path[2]
    };
  }
  return null;
}
