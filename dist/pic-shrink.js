#!/usr/bin/env node
"use strict";var R=Object.create;var E=Object.defineProperty;var V=Object.getOwnPropertyDescriptor;var Y=Object.getOwnPropertyNames;var D=Object.getPrototypeOf,H=Object.prototype.hasOwnProperty;var J=(e,i,n,t)=>{if(i&&typeof i=="object"||typeof i=="function")for(let o of Y(i))!H.call(e,o)&&o!==n&&E(e,o,{get:()=>i[o],enumerable:!(t=V(i,o))||t.enumerable});return e};var f=(e,i,n)=>(n=e!=null?R(D(e)):{},J(i||!e||!e.__esModule?E(n,"default",{value:e,enumerable:!0}):n,e));var B=f(require("chalk"));var v=f(require("yargs"));var d=require("fs"),u=require("path");function $(e){return(0,d.lstatSync)(e).isFile()}function h(e){return e?((0,d.statSync)(e).size/(1024*1024)).toFixed(2):"0KB"}function S(e){let i=(0,u.parse)(e).ext;return[".jpg",".jpeg",".png",".webp"].includes(i)}function y(e){let i=process.cwd();return(0,u.relative)(i,e)}function C(e){let{name:i,ext:n}=(0,u.parse)(e);return`${i}_compressed${n}`}async function p(e){return new Promise(i=>{setTimeout(i,e)})}function b(){let{argv:e}=(0,v.default)(process.argv),{imagesPath:i,outputPath:n,compressionLevel:t,i:o,o:s,c:l}=e;if(i=i||o,n=n||s,t=t||l,t&&isNaN(parseInt(t)))throw new Error("Error: Invalid compression level passed");return{imagesPath:i,outputPath:n,compressionLevel:t}}function k(e){console.log(`========================================

Output File: ${y(e)}

========================================`)}function z(e){console.log(`========================================

Compression complete!

Total Images Processed: ${e}

========================================`)}function x(e,i,n){console.log(`Processing: ${e}

Original Size: ${n}MB   New Size: ${i}MB
        `)}function O(){console.log("========================================")}function F(e,i,n=!1){console.log(`
========================================

Image${n?"":"s"} Path: ${y(e)}${i?`
Output Path: ${y(i)}`:""}

========================================
    `)}function T(){v.default.usage(`pic-shrink is an easy-to-use CLI tool for compressing images in JPG, PNG, and WEBP.

Usage: pic-shrink <image-file-path>`).option("i",{alias:"imagesPath",describe:"Path to the directory containing the images you want to compress.",type:"string",demandOption:!1}).option("o",{alias:"outputPath",describe:"Path to the directory where you want to store the compressed images",type:"string",demandOption:!1}).option("c",{alias:"compressionLevel",describe:"Optional value between 1 and 10 to specify the compression level for the images",type:"number",demandOption:!1}).example([["pic-shrink image.jpg","Compress a single image file"],["pic-shrink image.jpg -c 4","Compress a single image file with a custom compression level"],["pic-shrink -i ./images","Compress images in the `images` directory and store the compressed images in the same directory"],["pic-shrink -i ./images -o ./compressed","Compress images in the `images` directory and store them in the `compressed` folder"],["pic-shrink -i ./images -c 8","Compress images in the `images` directory using a custom compression level of `8`"]]).parse()}var a=require("path"),j=f(require("sharp"));var g=require("fs");async function M(e,i,n){let t=(0,j.default)(e),s=(await t.metadata()).format,l=h(e),r={jpeg:{quality:70},webp:{quality:70},png:{compressionLevel:7}},m;i&&(m=parseInt(i),m<1&&(m=1),m>10&&(m=10),r.jpeg.quality=m*10,r.webp.quality=m*10,r.png.compressionLevel=m);let{dir:P,base:w}=(0,a.parse)(e);if(n){let c=(0,a.join)(n,w);await t[s](r[s]).toFile(c);let I=h(c);x(w,I,l)}else{let c=C(e),I=`${P}/${c}`;await t[s](r[s]).toFile(`${P}/${c}`);let G=h(I);x(w,G,l)}}async function L(e,i){let n=(0,a.resolve)(e);if(S(n)){console.time("Time Taken"),F(n,"",!0),await p(1e3),await M(n,i,""),await p(1e3),k(C(n)),console.timeEnd("Time Taken"),console.log(`
`);return}else throw new Error("Error: Invalid image passed")}async function N(e,i,n){if(!e)throw new Error("Error: Images path not specified");let t=(0,a.resolve)(e);if(!(0,g.existsSync)(t))throw new Error("Error: Images file path is invalid");let o;i&&(o=(0,a.resolve)(i),o&&!(0,g.existsSync)(o)&&(0,g.mkdir)(o,{recursive:!0},r=>{if(r)throw new Error(`Error: Failed to create new directory at ${o}`)})),console.time("Time Taken"),F((0,a.resolve)(e),i?(0,a.resolve)(i):""),await p(700),console.log("Scanning directory for images...");let s=(0,g.readdirSync)(t).map(r=>(0,a.join)(t,r)).filter($).filter(S);if(s.length===0)throw new Error(`Error: No images found at: ${t}`);await p(1e3),console.log(`Found ${s.length} images.
`),O(),await p(1e3),console.log(`
Compressing images...
`),await p(1600);let l=0;Promise.all(s.map(async r=>{await M(r,n,o),l+=1})).then(async()=>{await p(1e3),z(l),console.timeEnd("Time Taken"),console.log(`
`)})}var q=f(require("yargs"));async function K(){try{if(process.argv.length<3){let s=await q.default.getHelp();throw new Error(s)}let{compressionLevel:e,imagesPath:i,outputPath:n}=b(),t=process.argv[2];t&&!i?await L(t,e):i&&await N(i,n,e)}catch(e){console.error(B.default.red(e.message))}}function U(){T(),K()}U();
//# sourceMappingURL=pic-shrink.js.map
