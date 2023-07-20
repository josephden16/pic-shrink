const esbuild = require("esbuild");
const config = require("./esbuild-config");

async function runWatchMode() {
  let ctx = await esbuild.context(config);
  await ctx.watch();
  console.log("Watching...");
}

runWatchMode();
