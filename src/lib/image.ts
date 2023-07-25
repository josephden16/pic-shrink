import { join, parse, resolve } from "path";
import sharp, { Sharp, Metadata } from "sharp";
import { getFileSize, getOutputFileName, isFile, isImageFile } from "./file";
import {
  delay,
  printConclusion,
  printImageCompressionStatus,
  printIntro,
  printLineSection,
  printSingleImageCompressionConclusion,
} from "./utils";
import { existsSync, mkdir, readdirSync } from "fs";

export async function compressImage(
  imageFile: string,
  compressionLevel: string,
  outputImageDir: string
) {
  const image = sharp(imageFile) as Sharp;
  const meta = (await image.metadata()) as Metadata;
  const format = meta.format as "jpeg" | "webp" | "png";
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

  const { dir, base } = parse(imageFile);
  if (!outputImageDir) {
    // Store the compressed images where the original images are located
    const outputImageFilename = getOutputFileName(imageFile);
    const outputImagePath = `${dir}/${outputImageFilename}`;
    await image[format](config[format]).toFile(`${dir}/${outputImageFilename}`);
    const newFileSize = getFileSize(outputImagePath);
    printImageCompressionStatus(base, newFileSize, originalFileSize);
  } else {
    // Store the compressed images at the specified output directory
    const outputImagePath = join(outputImageDir, base);
    await image[format](config[format]).toFile(outputImagePath);
    const newFileSize = getFileSize(outputImagePath);
    printImageCompressionStatus(base, newFileSize, originalFileSize);
  }
}

export async function handleSingleImageFileCompression(
  imagePath: string,
  compressionLevel: string
) {
  const imageFilePath = resolve(imagePath);
  const isImageValid = isImageFile(imageFilePath);
  if (isImageValid) {
    console.time("Time Taken");
    printIntro(imageFilePath, "", true);
    await delay(1000);
    await compressImage(imageFilePath, compressionLevel, "");
    await delay(1000);
    printSingleImageCompressionConclusion(getOutputFileName(imageFilePath));
    console.timeEnd("Time Taken");
    console.log("\n");
    return;
  } else {
    throw new Error("Error: Invalid image passed");
  }
}

export async function handleMultipleImageCompression(
  imagesPath: any,
  outputPath: any,
  compressionLevel: any
) {
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
      mkdir(outputImageDir, { recursive: true }, (error) => {
        if (error) {
          throw new Error(
            `Error: Failed to create new directory at ${outputImageDir}`
          );
        }
      });
    }
  }

  console.time("Time Taken")
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
      await compressImage(imageFile, compressionLevel, outputImageDir);
      imagesProcessed += 1;
    })
  ).then(async () => {
    await delay(1000);
    printConclusion(imagesProcessed);
    console.timeEnd("Time Taken");
    console.log("\n");
  });
}
