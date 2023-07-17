import esbuild from "esbuild";

// Automatically exclude all node_modules from the bundled version
import { nodeExternalsPlugin } from "esbuild-node-externals";

export const config = {
  entryPoints: ["./src/index.ts"],
  outfile: "dist/app.js",
  bundle: true,
  minify: true,
  platform: "node",
  sourcemap: true,
  target: "node14",
  format: "cjs",
  plugins: [nodeExternalsPlugin()],
};

esbuild.build(config).catch(() => process.exit(1));
