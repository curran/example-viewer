import npm from "rollup-plugin-node-resolve";

export default {
  entry: "src/client/index.js",
  format: "iife",
  plugins: [npm()],
  dest: "example-viewer-dist/bundle.js"
};
