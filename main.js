import fs from "fs";
import {
	keyword,
	operator,
	operatorPunctuators,
	punctuators,
	regexMatchers,
} from "./constants.js";

function wordBreak(sourceCode) {
	const lexemes = [];
	let position = 0;
	let lineNumber = 1;
	const length = sourceCode.length;

	while (position < length) {
		while (position < length && /\s/.test(sourceCode[position])) {
			if (sourceCode[position] === "\n") lineNumber++;
			position++;
		}
		if (position >= length) break;

		const currentLine = lineNumber;

		if (sourceCode.startsWith("//", position)) {
			while (position < length && sourceCode[position] !== "\n") position++;
			continue;
		}
		if (sourceCode.startsWith("/*", position)) {
			const endIndex = sourceCode.indexOf("*/", position + 2);
			if (endIndex === -1) {
				lexemes.push({ value: sourceCode.slice(position), line: currentLine });
				break;
			}
			const comment = sourceCode.slice(position, endIndex + 2);
			lineNumber += (comment.match(/\n/g) || []).length;
			position = endIndex + 2;
			continue;
		}

		if (sourceCode[position] === '"' || sourceCode[position] === "'") {
			const quote = sourceCode[position];
			let value = quote;
			position++;
			let escape = false;
			while (position < length) {
				const char = sourceCode[position];
				value += char;
				if (char === "\n") lineNumber++;
				position++;
				if (escape) escape = false;
				else if (char === "\\") escape = true;
				else if (char === quote) break;
			}
			lexemes.push({ value, line: currentLine });
			continue;
		}

		let found = false;
		for (const op of operatorPunctuators) {
			if (sourceCode.startsWith(op, position)) {
				lexemes.push({ value: op, line: currentLine });
				position += op.length;
				found = true;
				break;
			}
		}
		if (found) continue;

		let value = "";
		while (position < length) {
			const char = sourceCode[position];
			if (
				/\s/.test(char) ||
				operatorPunctuators.some((op) => sourceCode.startsWith(op, position))
			)
				break;
			value += char;
			position++;
		}
		if (value) lexemes.push({ value, line: currentLine });
	}

	return lexemes;
}

function generateTokens(lexemes) {
	return lexemes.map(({ value, line }) => {
		if (keyword.includes(value)) return { cp: "keyword", vp: value, line };
		if (operator.includes(value)) return { cp: "operator", vp: value, line };
		if (punctuators.includes(value))
			return { cp: "punctuator", vp: value, line };

		for (const { type, regex } of regexMatchers) {
			if (regex.test(value)) return { cp: type, vp: value, line };
		}

		return { cp: "Error", vp: value, line };
	});
}

const sourceCode = fs.readFileSync("source.txt", "utf-8");
const lexemes = wordBreak(sourceCode);
const tokens = generateTokens(lexemes);
console.log(tokens);
