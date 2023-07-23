#!/usr/bin/env node
"use strict";var G=Object.create;var $=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var Y=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var J=(e,i,t,n)=>{if(i&&typeof i=="object"||typeof i=="function")for(let o of V(i))!D.call(e,o)&&o!==t&&$(e,o,{get:()=>i[o],enumerable:!(n=R(i,o))||n.enumerable});return e};var w=(e,i,t)=>(t=e!=null?G(Y(e)):{},J(i||!e||!e.__esModule?$(t,"default",{value:e,enumerable:!0}):t,e));var q=w(require("chalk"));var v=w(require("yargs"));var f=require("fs"),u=require("path");function b(e){return(0,f.lstatSync)(e).isFile()}function d(e){return e?((0,f.statSync)(e).size/(1024*1024)).toFixed(2):"0KB"}function S(e){let i=(0,u.parse)(e).ext;return[".jpg",".jpeg",".png",".webp"].includes(i)}function h(e){let i=process.cwd();return(0,u.relative)(i,e)}function C(e){let{name:i,ext:t}=(0,u.parse)(e);return`${i}_compressed${t}`}async function g(e){return new Promise(i=>{setTimeout(i,e)})}function E(){let{argv:e}=(0,v.default)(process.argv),{imagesPath:i,outputPath:t,compressionLevel:n,i:o,o:a,c:p}=e;if(i=i||o,t=t||a,n=n||p,n&&isNaN(parseInt(n)))throw new Error("Error: Invalid compression level passed");return{imagesPath:i,outputPath:t,compressionLevel:n}}function z(e){console.log(`========================================

Output File: ${h(e)}

========================================`)}function O(e){console.log(`========================================

Compression complete!

Total Images Processed: ${e}

========================================`)}function x(e,i,t){console.log(`Processing: ${e}

Original Size: ${t}MB   New Size: ${i}MB
        `)}function k(){console.log("========================================")}function F(e,i,t=!1){console.log(`
CLI Image Compression Tool

========================================

Image${t?"":"s"} Path: ${h(e)}${i?`
Output Path: ${h(i)}`:""}

========================================
    `)}function j(){v.default.usage(`pic-shrink is an easy-to-use CLI tool for compressing images in JPG, PNG, and WEBP.

Usage: pic-shrink -i <images-path> -o <output-path> -c <compression-level>`).option("i",{alias:"imagesPath",describe:"Path to the directory containing the images you want to compress.",type:"string",demandOption:!1}).option("o",{alias:"outputPath",describe:"Path to the directory where you want to store the compressed images",type:"string",demandOption:!1}).option("c",{alias:"compressionLevel",describe:"Optional value between 1 and 10 to specify the compression level for the images",type:"number",demandOption:!1}).example([["pic-shrink image.jpg","Compress a single image file"],["pic-shrink image.jpg -c 4","Compress a single image file with a custom compression level"],["pic-shrink -i ./images","Compress images in the `images` directory and store the compressed images in the same directory"],["pic-shrink -i ./images -o ./compressed","Compress images in the `images` directory and store them in the `compressed` folder"],["pic-shrink -i ./images -c 8","Compress images in the `images` directory using a custom compression level of `8`"]]).parse()}var r=require("path"),L=w(require("sharp"));var l=require("fs");async function M(e,i,t){let n=(0,L.default)(e),a=(await n.metadata()).format,p=d(e),s={jpeg:{quality:70},webp:{quality:70},png:{compressionLevel:7}},m;i&&(m=parseInt(i),m<1&&(m=1),m>10&&(m=10),s.jpeg.quality=m*10,s.webp.quality=m*10,s.png.compressionLevel=m);let{dir:P,base:y}=(0,r.parse)(e);if(t){let c=(0,r.join)(t,y);await n[a](s[a]).toFile(c);let I=d(c);x(y,I,p)}else{let c=C(e),I=`${P}/${c}`;await n[a](s[a]).toFile(`${P}/${c}`);let T=d(I);x(y,T,p)}}async function N(e,i){let t=(0,r.resolve)(e);if(S(t)){F(t,"",!0),await M(t,i,""),z(C(t));return}else throw new Error("Error: Invalid image passed")}async function B(e,i,t){if(!e)throw new Error("Error: Images path not specified");let n=(0,r.resolve)(e);if(!(0,l.existsSync)(n))throw new Error("Error: Images file path is invalid");let o;i&&(o=(0,r.resolve)(i),o&&!(0,l.existsSync)(o)&&(0,l.mkdir)(o,{recursive:!0},s=>{if(s)throw new Error(`Error: Failed to create new directory at ${o}`)})),F((0,r.resolve)(e),i?(0,r.resolve)(i):""),await g(700),console.log("Scanning directory for images...");let a=(0,l.readdirSync)(n).map(s=>(0,r.join)(n,s)).filter(b).filter(S);if(a.length===0)throw new Error(`Error: No images found at: ${n}`);await g(1e3),console.log(`Found ${a.length} images.
`),k(),await g(1e3),console.log(`
Compressing images...
`),await g(1600);let p=0;Promise.all(a.map(async s=>{await M(s,t,o),p+=1})).then(async()=>{await g(1e3),O(p)})}async function K(){try{let{compressionLevel:e,imagesPath:i,outputPath:t}=E(),n=process.argv[2];n&&!i?await N(n,e):await B(i,t,e)}catch(e){console.error(q.default.red(e.message))}}function U(){j(),K()}U();
//# sourceMappingURL=image-compressor.js.map
