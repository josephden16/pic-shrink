# image-compressor

image-compressor is an easy-to-use CLI tool for compressing images in JPG, PNG, and WEBP.

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

To compress a single image file, you can use the following command:

```shell
image-compressor <image-file-path>
```

To compress multiple image files run the following command:

```shell
image-compressor -i <images-path> -o <output-path> -c <compression-level>
```

Replace `<images-path>` with the path to the directory containing the images you want to compress.

Replace `<output-path>` with the optional path to the directory where you want to store the compressed images. If not provided, the compressed images will be stored in the same directory as the original images.

Replace `<compression-level>` with an optional value between 1 and 10 to specify the compression level for the images. Lower values result in higher compression and lower image quality, while higher values result in lower compression and higher image quality. If not provided, the default compression level of 7 will be used.

## Examples

Compress a single image file

```shell
image-compressor image.jpg
```

Compress a single image file with a custom compression level

```shell
image-compressor image.jpg -c 4
```

Compress images located in the "images" directory and store the compressed images in the same directory:

```shell
image-compressor -i images
```

Compress images located in the "images" directory and store the compressed images in the "output" directory. If the "output" directory does not exist it will be created automatically:

```shell
image-compressor -i images -o output
```

Compress images located in the "images" directory with a custom compression level:

```shell
image-compressor -i images -c 5
```

## Notes

- Supported image formats: JPEG, PNG, and WebP.
- The CLI application uses the Node.js `sharp` package to perform image compression.
- Compressed images will be suffixed with "\_compressed" and stored in the specified or original directory.
- The compression level is optional, and if not provided, default values will be used.

**Please feel free to create issues for any bugs or unexpected behaviour you come across while using this tool.**
