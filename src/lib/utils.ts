import yargs from "yargs";

export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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
  console.log(`Processing: ${image}  [============] 100%\n\nOriginal Size: ${originalFileSize}MB   New Size: ${newFileSize}MB
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

export function setupYargsOptions() {
  yargs
    .usage(
      "CLI application for compressing images in a directory.\nUsage: image-compressor -i <images-path> -o <output-path> -c <compression-level>"
    )
    .option("i", {
      alias: "imagesPath",
      describe:
        "Path to the directory containing the images you want to compress.",
      type: "string",
      demandOption: true,
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
