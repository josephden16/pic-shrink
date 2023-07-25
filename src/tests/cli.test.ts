import { runCommand } from "./helpers";

describe("pic-shrink", () => {
  it("should fail and print out usage instructions", async () => {
    try {
      await runCommand([]);
    } catch (error: any) {
      expect(error.trim()).toMatch('pic-shrink is an easy-to-use CLI tool for compressing images in JPG, PNG, and WEBP.')
    }
  });

  it("should fail and print out an invalid file is passed", async () => {
    try {
      await runCommand(["image.txt"]);
    } catch (error: any) {
      expect(error.trim()).toMatch('Error: Invalid image passed')
    }
  });
})
