import yargs from "yargs";
import { getRelativePath } from "./file";

export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function getCommandlineInputs() {
  const { argv } = yargs(process.argv) as any;
  let { imagesPath, outputPath, compressionLevel, i, o, c } = argv;
  imagesPath = imagesPath || i;
  outputPath = outputPath || o;
  compressionLevel = compressionLevel || c;

  if (compressionLevel) {
    if (isNaN(parseInt(compressionLevel))) {
      throw new Error("Error: Invalid compression level passed");
    }
  }

  return {
    imagesPath,
    outputPath,
    compressionLevel,
  };
}

export function printSingleImageCompressionConclusion(outputFile: string) {
  console.log(
    `========================================\n\nOutput File: ${getRelativePath(
      outputFile
    )}\n\n========================================`
  );
}

export function printConclusion(imagesProcessed: number | string) {
  console.log(
    `========================================\n\nCompression complete!\n\nTotal Images Processed: ${imagesProcessed}\n\n========================================`
  );
}

export function printImageCompressionStatus(
  image: string,
  newFileSize: string,
  originalFileSize: string
) {
  console.log(`Processing: ${image}\n\nOriginal Size: ${originalFileSize}MB   New Size: ${newFileSize}MB
        `);
}

export function printLineSection() {
  console.log(`========================================`);
}

export function printIntro(
  imagesPath: string,
  outputPath: string,
  compressingSingleImage: boolean = false
) {
  console.log(`\nCLI Image Compression Tool\n\n========================================\n\nImage${
    compressingSingleImage ? "" : "s"
  } Path: ${getRelativePath(imagesPath)}${
    outputPath ? `\nOutput Path: ${getRelativePath(outputPath)}` : ""
  }\n\n========================================
    `);
}

export function setupYargsOptions() {
  yargs
    .usage(
      "image-compressor is an easy-to-use CLI tool for compressing images in JPG, PNG, and WEBP.\n\nUsage: image-compressor -i <images-path> -o <output-path> -c <compression-level>"
    )
    .option("i", {
      alias: "imagesPath",
      describe:
        "Path to the directory containing the images you want to compress.",
      type: "string",
      demandOption: false,
    })
    .option("o", {
      alias: "outputPath",
      describe:
        "Path to the directory where you want to store the compressed images",
      type: "string",
      demandOption: false,
    })
    .option("c", {
      alias: "compressionLevel",
      describe:
        "Optional value between 1 and 10 to specify the compression level for the images",
      type: "number",
      demandOption: false,
    })
    .example([
      ["image-compressor image.jpg", "Compress a single image file"],
      [
        "image-compressor image.jpg -c 4",
        "Compress a single image file with a custom compression level",
      ],
      [
        "image-compressor -i ./images",
        "Compress images in the `images` directory and store the compressed images in the same directory",
      ],
      [
        "image-compressor -i ./images -o ./compressed",
        "Compress images in the `images` directory and store them in the `compressed` folder",
      ],
      [
        "image-compressor -i ./images -c 8",
        "Compress images in the `images` directory using a custom compression level of `8`",
      ],
    ])
    .parse();
}
