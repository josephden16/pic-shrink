import { join, parse } from "path";
import sharp, { Sharp, Metadata } from "sharp";
import { getFileSize } from "./file";
import { printImageCompressionStatus } from "./utils";

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

  const { base, dir } = parse(imageFile);
  if (!outputImageDir) {
    // Store the compressed images where the original images are located
    const outputImagePath = `${dir}/compressed-${base}`;
    await image[format](config[format]).toFile(outputImagePath);
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
