import { select } from "d3-selection";
import "d3-transition";
import { easeLinear } from "d3-ease";
import { component } from "d3-component";

var previousTime = 0;

const svgOverlay = component("svg")
  .render(function ({ width, height, message, position, size}){

    const svg = select(this)
        .attr("width", width)
        .attr("height", height);

    const text = svg.selectAll("text").data([1]);
    text
      .enter().append("text")
        .style("text-shadow", "0px 0px 10px white")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
      .merge(text)
        .interrupt("pop")
        .attr("x", width * position)
        .attr("y", height / 2)
        .attr("font-size", size + "em")
        .attr("opacity", 1)
        .text(message)
      .transition("pop").duration(700).ease(easeLinear)
        .attr("font-size", (size * 1.2) + "em")
        .attr("opacity", 0);
  });

export default component("div", "overlay")
  .render(function ({notify}){

    // Trigger the notification based on a changed timestamp.
    if(notify && notify.time !== previousTime){
      previousTime = notify.time;
      svgOverlay(this, {
        width: this.clientWidth,
        height: this.clientHeight,
        message: notify.message,
        position: notify.position || 0.5,
        size: notify.size || 20
      });
    }
  });

//
//
//
//    }
//  };
//}
