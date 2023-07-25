import {join} from 'path';

export async function runCommand(args: string[]) {
  process.argv = [
    "node", // Not used but a value is required at this index in the array
    '../../../dist/pic-shrink', // Not used but a value is required at this index in the array
    ...args,
  ];

  // Require the yargs CLI script
  return require("../../index");
}