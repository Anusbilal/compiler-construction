import { wordBreak, generateTokens } from "./lexical.js";
import createParser from "./parser.js";
import fs from "fs";

// In your parser:
const sourceCode = fs.readFileSync("source.txt", "utf-8");
const lexemes = wordBreak(sourceCode);
const tokens = generateTokens(lexemes);
const parser = createParser(tokens);
parser.parse();
