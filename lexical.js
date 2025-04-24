import {
	keyword,
	operator,
	operatorPunctuators,
	punctuators,
	regexMatchers,
} from "./constants.js";

// Improved word break analyzer
export function wordBreak(sourceCode) {
	const lexemes = [];
	let position = 0;
	let lineNumber = 1;
	const length = sourceCode.length;

	while (position < length) {
		// Skip whitespace
		while (position < length && /\s/.test(sourceCode[position])) {
			if (sourceCode[position] === "\n") lineNumber++;
			position++;
		}
		if (position >= length) break;

		const currentLine = lineNumber;

		// Handle comments
		if (sourceCode.startsWith("//", position)) {
			while (position < length && sourceCode[position] !== "\n") position++;
			continue;
		}

		if (sourceCode.startsWith("/*", position)) {
			const endIndex = sourceCode.indexOf("*/", position + 2);
			if (endIndex === -1) {
				lexemes.push({
					value: sourceCode.slice(position),
					line: currentLine,
					error: "Unterminated block comment",
				});
				break;
			}
			position = endIndex + 2;
			continue;
		}

		// Handle strings
		if (sourceCode[position] === '"') {
			let value = '"';
			position++;
			while (position < length) {
				const char = sourceCode[position];
				value += char;
				position++;
				if (char === '"' && sourceCode[position - 2] !== "\\") break;
			}
			if (!value.endsWith('"')) {
				lexemes.push({
					value,
					line: currentLine,
					error: "Unterminated string literal",
				});
			} else {
				lexemes.push({ value, line: currentLine });
			}
			continue;
		}

		// Handle operators and punctuators
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

		// Handle identifiers and literals
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

		if (value) {
			lexemes.push({ value, line: currentLine });
		}
	}

	return lexemes;
}

// Enhanced token generator
export function generateTokens(lexemes) {
	return lexemes.map(({ value, line, error }) => {
		if (error) return { cp: "ERROR", vp: value, line, error };

		// Check keywords first
		if (keyword.includes(value))
			return { cp: value.toUpperCase(), vp: value, line };

		// Check operators
		if (operator.includes(value)) return { cp: "OPERATOR", vp: value, line };

		// Check punctuators
		if (punctuators.includes(value))
			return { cp: "PUNCTUATOR", vp: value, line };

		// Check regex patterns
		for (const { type, regex } of regexMatchers) {
			if (regex.test(value)) {
				// Special handling for boolean constants
				if (type === "flag_const" && (value === "true" || value === "false")) {
					return { cp: "FLAG_CONST", vp: value, line };
				}
				return { cp: type.toUpperCase(), vp: value, line };
			}
		}

		// Default to identifier if no matches
		return { cp: "IDENTIFIER", vp: value, line };
	});
}
