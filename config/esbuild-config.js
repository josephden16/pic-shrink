const { nodeExternalsPlugin } = require("esbuild-node-externals");
module.exports = {
  entryPoints: ["./src/index.ts"],
  outfile: "dist/image-compressor.js",
  bundle: true,
  minify: true,
  platform: "node",
  sourcemap: true,
  target: "node14",
  format: "cjs",
  plugins: [nodeExternalsPlugin()],
};
