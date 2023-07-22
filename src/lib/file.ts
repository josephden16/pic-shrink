import { statSync, lstatSync } from "node:fs";
import { parse, relative } from "node:path";

export function isFile(fileName: string) {
  return lstatSync(fileName).isFile();
}

export function getFileSize(filePath: string): string {
  if (filePath) {
    const stats = statSync(filePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    return fileSizeInMegabytes.toFixed(2);
  } else {
    return "0KB";
  }
}

export function isImageFile(filePath: string) {
  const fileExtension = parse(filePath).ext;
  const imageFileExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  return imageFileExtensions.includes(fileExtension);
}

export function getRelativePath(absolutePath: string) {
  const baseDir = process.cwd();
  const relativePath = relative(baseDir, absolutePath);
  return relativePath;
}

export function getOutputFileName(imageFile: string) {
  const { name, ext } = parse(imageFile);
  const outputImagePath = `${name}_compressed${ext}`;
  return outputImagePath;
}
