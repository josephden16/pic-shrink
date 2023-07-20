const esbuild = require("esbuild");
const config = require("./esbuild-config");

// Automatically exclude all node_modules from the bundled version

esbuild.build(config).catch(() => process.exit(1));
