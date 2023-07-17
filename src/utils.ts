import { statSync, lstatSync } from "node:fs";
import { parse } from "node:path";

export function getFileSize(filePath: string): string {
  if (filePath) {
    const stats = statSync(filePath);
    const fileSizeInBytes = stats.size;
    // Convert the file size to megabytes (optional)
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    return fileSizeInMegabytes.toFixed(2);
  } else {
    return "0KB";
  }
}

export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const isFile = (fileName: string) => {
  return lstatSync(fileName).isFile();
};

export const isImageFile = (filePath: string) => {
  const fileExtension = parse(filePath).ext;
  const imageFileExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  return imageFileExtensions.includes(fileExtension);
};

export function printConclusion(imagesProcessed: number | string) {
  console.log(
    `========================================\n\nCompression complete!\n\nTotal Images Processed: ${imagesProcessed}\n\n========================================`
  );
}

export function printImageCompressionStatus(
  newFileSize: string,
  originalFileSize: string
) {
  console.log(`Processing: image1.jpg  [==============================] 100%\n\nOriginal Size: ${originalFileSize}MB   New Size: ${newFileSize}MB
        `);
}

export function printLineSection() {
  console.log(`========================================`);
}

export function printIntro(imagesPath: string, outputPath: string) {
  console.log(`\nCLI Image Compression Tool\n\n========================================\n\nImages Path: ${imagesPath} \n${
    outputPath ? `Output Path: ${outputPath}` : ""
  }\n\n========================================
    `);
}
