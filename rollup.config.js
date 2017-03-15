import npm from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";

export default {
  entry: "src/client/index.js",
  format: "iife",
  plugins: [
    npm({
      jsnext: true
    }),
    babel({
      exclude: "node_modules/**"
    }),
    replace({ // Fixes build error with Redux.
      "process.env.NODE_ENV": "'production'"
    })
  ],
  dest: "example-viewer-dist/bundle.js"
};
