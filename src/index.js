#!/usr/bin/env node

import { existsSync, readdirSync } from "node:fs";
import { resolve, parse, join } from "node:path";
import yargs from "yargs";
import chalk from "chalk";
import sharp from "sharp";
import {
  delay,
  getFileSize,
  isFile,
  isImageFile,
  printConclusion,
  printImageCompressionStatus,
  printIntro,
  printLineSection,
} from "./utils.js";

const { argv } = yargs(process.argv);

async function main() {
  try {
    // Validate images path
    const { imagesPath, outputPath, compressionLevel } = argv;
    if (!imagesPath) {
      throw new Error("Images path not passed");
    }
    const imageFilesPath = resolve(".", imagesPath);
    if (!existsSync(imageFilesPath)) {
      throw new Error("Images file path is invalid");
    }
    const outputImageDir = resolve(".", outputPath);
    if (outputImageDir && !existsSync(outputImageDir)) {
      throw new Error(`Output directory "${outputImageDir}" does not exist`);
    }

    printIntro(imagesPath, outputPath);

    // Read images in the directory
    await delay(700);
    console.log("Scanning directory for images...");

    const imageFiles = readdirSync(imageFilesPath)
      .map((fileName) => {
        return join(imageFilesPath, fileName);
      })
      .filter(isFile)
      .filter(isImageFile);

    if (imageFiles.length === 0) {
      throw new Error(`No images found at: ${imageFilesPath}`);
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
        const image = sharp(imageFile);
        const meta = await image.metadata();
        const { format } = meta;
        const originalFileSize = getFileSize(imageFile);

        const config = {
          jpeg: { quality: 70 },
          webp: { quality: 70 },
          png: { compressionLevel: 7 },
        };

        let quality;
        if (compressionLevel) {
          // compression level for the images usually between 1 to 10
          quality = parseInt(compressionLevel);
          if (quality < 1) quality = 1;
          if (quality > 10) quality = 10;
          config.jpeg.quality = quality * 10;
          config.webp.quality = quality * 10;
          config.png.compressionLevel = quality;
        }

        const { base, dir } = parse(imageFile);
        if (!outputPath) {
          // Store the compressed images where the original images are located
          const outputImagePath = `${dir}/compressed-${base}`;
          await image[format](config[format]).toFile(outputImagePath);
          const newFileSize = getFileSize(outputImagePath);
          printImageCompressionStatus(newFileSize, originalFileSize);
        } else {
          // Store the compressed images at the specified output directory
          const outputImagePath = join(outputImageDir, base);
          await image[format](config[format]).toFile(outputImagePath);
          const newFileSize = getFileSize(outputImagePath);
          printImageCompressionStatus(newFileSize, originalFileSize);
        }
        imagesProcessed += 1;
      })
    ).then(async () => {
      await delay(1000);
      printConclusion(imagesProcessed);
    });
  } catch (error) {
    console.error(chalk.red(`Error: ` + error.message));
  }
}

main();
