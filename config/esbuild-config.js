const { nodeExternalsPlugin } = require("esbuild-node-externals");
module.exports = {
  entryPoints: ["./src/index.ts"],
  outfile: "dist/pic-shrink.js",
  bundle: true,
  minify: true,
  platform: "node",
  sourcemap: true,
  target: "node14",
  format: "cjs",
  plugins: [nodeExternalsPlugin()],
};
