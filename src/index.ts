#!/usr/bin/env node

import { existsSync, mkdir, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import yargs from "yargs";
import chalk from "chalk";
import {
  delay,
  printConclusion,
  printIntro,
  printLineSection,
  setupYargsOptions,
} from "lib/utils";

import { isFile, isImageFile } from "lib/file";
import { compressImage } from "lib/image";

async function main() {
  setupYargsOptions();
  try {
    // Validate images path
    const { argv } = yargs(process.argv) as any;
    let { imagesPath, outputPath, compressionLevel, i, o, c } = argv;
    imagesPath = imagesPath || i;
    outputPath = outputPath || o;
    compressionLevel = compressionLevel || c;
    if (!imagesPath) {
      throw new Error("Error: Images path not specified");
    }
    const imageFilesPath = resolve(imagesPath);
    if (!existsSync(imageFilesPath)) {
      throw new Error("Error: Images file path is invalid");
    }

    let outputImageDir: string;
    if (outputPath) {
      outputImageDir = resolve(outputPath);
      if (outputImageDir && !existsSync(outputImageDir)) {
        mkdir(outputImageDir, (error) => {
          if (error) {
            throw new Error(
              `Error: Failed to create new directory at ${outputImageDir}`
            );
          }
        });
      }
    }

    printIntro(resolve(imagesPath), outputPath ? resolve(outputPath) : "");

    // Read images in the directory
    await delay(700);
    console.log("Scanning directory for images...");

    const imageFiles = readdirSync(imageFilesPath)
      .map((fileName) => join(imageFilesPath, fileName))
      .filter(isFile)
      .filter(isImageFile);

    if (imageFiles.length === 0) {
      throw new Error(`Error: No images found at: ${imageFilesPath}`);
    }

    await delay(1000);
    console.log(`Found ${imageFiles.length} images.\n`);

    printLineSection();

    await delay(1000);
    console.log("\nCompressing images...\n");

    // Compress the images and store them in the appropriate location
    await delay(1600);
    let imagesProcessed = 0;
    Promise.all(
      imageFiles.map(async (imageFile) => {
        await delay(500);
        await compressImage(imageFile, compressionLevel, outputImageDir);
        imagesProcessed += 1;
      })
    ).then(async () => {
      await delay(1000);
      printConclusion(imagesProcessed);
    });
  } catch (error: any) {
    console.error(chalk.red(error.message));
  }
}

main();
