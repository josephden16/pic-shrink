import * as esbuild from "esbuild";
import { config } from "./esbuild.config.mjs";

let ctx = await esbuild.context(config);

await ctx.watch();
console.log("watching...");
