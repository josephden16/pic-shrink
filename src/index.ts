#!/usr/bin/env node

import chalk from "chalk";
import { getCommandlineInputs, setupYargsOptions } from "lib/utils";
import {
  handleSingleImageFileCompression,
  handleMultipleImageCompression,
} from "lib/image";

async function main() {
  try {
    const { compressionLevel, imagesPath, outputPath } = getCommandlineInputs();
    // Handle compression of a single image
    const image = process.argv[2];
    const shouldCompressSingleImage = image && !imagesPath;
    if (shouldCompressSingleImage) {
      await handleSingleImageFileCompression(image, compressionLevel);
    } else {
      // Handle compression of multiple images
      await handleMultipleImageCompression(
        imagesPath,
        outputPath,
        compressionLevel
      );
    }
  } catch (error: any) {
    console.error(chalk.red(error.message));
  }
}

function runImageCompressor() {
  setupYargsOptions();
  main();
}

runImageCompressor();
