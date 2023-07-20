import { statSync, lstatSync } from "node:fs";
import { parse } from "node:path";

export const isFile = (fileName: string) => {
  return lstatSync(fileName).isFile();
};

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

export const isImageFile = (filePath: string) => {
  const fileExtension = parse(filePath).ext;
  const imageFileExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  return imageFileExtensions.includes(fileExtension);
};
