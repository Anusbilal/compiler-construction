// Constants aligned with CFG terminals
export const keyword = [
	// Data types
	"num",
	"dec",
	"flag",
	"string",
	"obj",
	// Control flow
	"if",
	"else",
	"switch",
	"case",
	"default",
	"while",
	"repeat",
	"do",
	"break",
	"skip",
	"continue",
	"give",
	"try",
	"catch",
	"finally",
	// OOP
	"class",
	"abstract",
	"extends",
	"new",
	"this",
	"super",
	"constructor",
	// Other
	"var",
	"fn",
	"show",
	"prompt",
	"return",
];

export const operator = [
	// Arithmetic
	"+",
	"-",
	"*",
	"/",
	"%",
	"++",
	"--",
	// Comparison
	"==",
	"!=",
	"<",
	">",
	"<=",
	">=",
	// Logical
	"&&",
	"||",
	"!",
	// Assignment
	"=",
	"+=",
	"-=",
	"*=",
	"/=",
	"%=",
];

export const punctuators = ["(", ")", "{", "}", "[", "]", ",", ":", ".", ";"];

export const operatorPunctuators = [...operator, ...punctuators].sort(
	(a, b) => b.length - a.length,
);

export const regexMatchers = [
	{ type: "string_const", regex: /^"(?:[^"\\]|\\.)*"/ },
	{ type: "num_const", regex: /^-?\d+$/ },
	{ type: "dec_const", regex: /^-?\d+\.\d+(?:[eE][+-]?\d+)?$/ },
	{ type: "flag_const", regex: /^true|false$/ },
	{ type: "identifier", regex: /^[a-zA-Z_][a-zA-Z0-9_]*$/ },
];
