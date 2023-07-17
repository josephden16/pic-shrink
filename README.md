# CLI Image Compression Tool

A command-line interface (CLI) application for compressing images using the `sharp` package in Node.js.

## Prerequisites

- Node.js installed on your machine

## Installation

1. Clone the repository or download the source code.
2. Open a terminal or command prompt and navigate to the project directory.
3. Run the following command to install the required dependencies:

   ```shell
   npm install -g
   ```

## Usage

Run the following command to execute the CLI application:

```shell
image-compressor --imagesPath <images-path> --outputPath <output-path> --compressionLevel <compression-level>
```

Replace `<images-path>` with the path to the directory containing the images you want to compress.

Replace `<output-path>` with the optional path to the directory where you want to store the compressed images. If not provided, the compressed images will be stored in the same directory as the original images.

Replace `<compression-level>` with an optional value between 1 and 10 to specify the compression level for the images. Lower values result in higher compression and lower image quality, while higher values result in lower compression and higher image quality. If not provided, the default compression level of 7 will be used.

## Examples

Compress images located in the "images" directory and store the compressed images in the same directory:

```shell
image-compressor --imagesPath images
```

Compress images located in the "images" directory and store the compressed images in the "output" directory:

```shell
image-compressor --imagesPath images --outputPath output
```

Compress images located in the "images" directory with a custom compression level:

```shell
image-compressor --imagesPath images --compressionLevel 5
```

## Notes

- Supported image formats: JPEG, PNG, and WebP.
- The CLI application uses the `sharp` package to perform image compression.
- Compressed images will be prefixed with "compressed-" and stored in the specified or original directory.
- The compression level is optional, and if not provided, default values will be used.
