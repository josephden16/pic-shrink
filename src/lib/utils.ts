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
