import type { CodeLanguage } from "ui/packages/markdown/parseMarkdown";

export interface CodeColors {
	keyword: string;
	string: string;
	number: string;
	comment: string;
	func: string;
}

// ponytail: lines over 2000 chars stay one plain run. A real lexer if a minified file shows up.
const MAX_LINE = 2000;

const LUAU: { [key: string]: boolean } = {
	and: true,
	break: true,
	continue: true,
	do: true,
	else: true,
	elseif: true,
	end: true,
	false: true,
	for: true,
	function: true,
	if: true,
	in: true,
	local: true,
	nil: true,
	not: true,
	or: true,
	repeat: true,
	return: true,
	then: true,
	true: true,
	until: true,
	while: true,
};

const SCRIPT: { [key: string]: boolean } = {
	as: true,
	async: true,
	await: true,
	break: true,
	case: true,
	catch: true,
	class: true,
	const: true,
	continue: true,
	default: true,
	do: true,
	else: true,
	export: true,
	extends: true,
	false: true,
	finally: true,
	for: true,
	from: true,
	function: true,
	if: true,
	import: true,
	in: true,
	interface: true,
	let: true,
	new: true,
	null: true,
	of: true,
	return: true,
	static: true,
	super: true,
	switch: true,
	this: true,
	throw: true,
	true: true,
	try: true,
	type: true,
	typeof: true,
	undefined: true,
	var: true,
	void: true,
	while: true,
	yield: true,
};

const JSON_WORD: { [key: string]: boolean } = {
	false: true,
	null: true,
	true: true,
};

interface Scan {
	block?: "luau" | "ts";
	wantName: boolean;
}

function words(language: CodeLanguage): { [key: string]: boolean } | undefined {
	if (language === "luau") return LUAU;
	if (language === "ts") return SCRIPT;
	if (language === "json") return JSON_WORD;
	return undefined;
}

export function escapeRich(text: string): string {
	let out = "";
	for (let i = 1; i <= text.size(); i++) {
		const ch = text.sub(i, i);
		if (ch === "&") out += "&amp;";
		else if (ch === "<") out += "&lt;";
		else if (ch === ">") out += "&gt;";
		else if (ch === '"') out += "&quot;";
		else if (ch === "'") out += "&apos;";
		else out += ch;
	}
	return out;
}

function paint(text: string, kind: "plain" | "keyword" | "string" | "number" | "comment" | "func", colors: CodeColors): string {
	const safe = escapeRich(text);
	if (kind === "plain" || safe.size() === 0) return safe;
	const color = colors[kind];
	if (kind === "keyword") return `<font color="${color}"><b>${safe}</b></font>`;
	return `<font color="${color}">${safe}</font>`;
}

function isDigit(ch: string): boolean {
	return ch >= "0" && ch <= "9";
}

function isIdentStart(ch: string): boolean {
	return (ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z") || ch === "_";
}

function isIdent(ch: string): boolean {
	return isIdentStart(ch) || isDigit(ch);
}

function isHex(ch: string): boolean {
	return isDigit(ch) || (ch >= "a" && ch <= "f") || (ch >= "A" && ch <= "F");
}

function findPair(text: string, a: string, b: string, from: number): number | undefined {
	const last = text.size() - 1;
	for (let i = from; i <= last; i++) {
		if (text.sub(i, i) === a && text.sub(i + 1, i + 1) === b) return i;
	}
	return undefined;
}

function scanLine(line: string, language: CodeLanguage, state: Scan, colors: CodeColors): { text: string; state: Scan } {
	const dict = words(language);
	if (dict === undefined) return { text: escapeRich(line), state };
	if (line.size() > MAX_LINE && state.block === undefined) {
		return { text: escapeRich(line), state: { wantName: false } };
	}

	let i = 1;
	const limit = math.min(line.size(), MAX_LINE);
	let out = "";
	let block = state.block;
	let wantName = state.wantName;

	while (i <= limit) {
		if (block !== undefined) {
			const closer = block === "luau" ? "]]" : "*/";
			const at = findPair(line, closer.sub(1, 1), closer.sub(2, 2), i);
			if (at === undefined || at > limit) {
				out += paint(line.sub(i), "comment", colors);
				i = line.size() + 1;
				break;
			}
			out += paint(line.sub(i, at + 1), "comment", colors);
			i = at + 2;
			block = undefined;
			wantName = false;
			continue;
		}

		const ch = line.sub(i, i);
		const ahead = i < line.size() ? line.sub(i + 1, i + 1) : "";

		if (language === "luau" && ch === "-" && ahead === "-") {
			if (line.sub(i + 2, i + 3) === "[[") {
				block = "luau";
				i += 4;
				wantName = false;
				continue;
			}
			out += paint(line.sub(i), "comment", colors);
			wantName = false;
			i = line.size() + 1;
			break;
		}
		if (language !== "luau" && ch === "/" && ahead === "/") {
			out += paint(line.sub(i), "comment", colors);
			wantName = false;
			i = line.size() + 1;
			break;
		}
		if (language !== "luau" && ch === "/" && ahead === "*") {
			block = "ts";
			i += 2;
			wantName = false;
			continue;
		}

		if (ch === '"' || ch === "'") {
			let j = i + 1;
			while (j <= line.size()) {
				const c = line.sub(j, j);
				if (c === "\\") {
					j += 2;
					continue;
				}
				if (c === ch) {
					j += 1;
					break;
				}
				j += 1;
			}
			out += paint(line.sub(i, j - 1), "string", colors);
			i = j;
			wantName = false;
			continue;
		}
		if (language === "luau" && ch === "[" && ahead === "[") {
			const at = findPair(line, "]", "]", i + 2);
			const stop = at === undefined ? line.size() : at + 1;
			out += paint(line.sub(i, stop), "string", colors);
			i = stop + 1;
			wantName = false;
			continue;
		}

		if (isDigit(ch)) {
			let j = i;
			if (ch === "0" && (ahead === "x" || ahead === "X") && language !== "json") {
				j = i + 2;
				while (j <= line.size() && isHex(line.sub(j, j))) j += 1;
			} else {
				while (j <= line.size() && isDigit(line.sub(j, j))) j += 1;
				if (line.sub(j, j) === "." && isDigit(line.sub(j + 1, j + 1))) {
					j += 1;
					while (j <= line.size() && isDigit(line.sub(j, j))) j += 1;
				}
				const exp = line.sub(j, j);
				if (exp === "e" || exp === "E") {
					let k = j + 1;
					const sign = line.sub(k, k);
					if (sign === "+" || sign === "-") k += 1;
					if (isDigit(line.sub(k, k))) {
						j = k;
						while (j <= line.size() && isDigit(line.sub(j, j))) j += 1;
					}
				}
			}
			out += paint(line.sub(i, j - 1), "number", colors);
			i = j;
			wantName = false;
			continue;
		}

		if (isIdentStart(ch)) {
			let j = i + 1;
			while (j <= line.size() && isIdent(line.sub(j, j))) j += 1;
			const word = line.sub(i, j - 1);
			if (dict[word] === true) {
				out += paint(word, "keyword", colors);
				wantName = word === "function";
			} else if (wantName) {
				out += paint(word, "func", colors);
				wantName = false;
			} else {
				out += paint(word, "plain", colors);
			}
			i = j;
			continue;
		}

		if (ch !== " " && ch !== "\t") wantName = false;
		out += escapeRich(ch);
		i += 1;
	}

	if (i <= line.size()) out += escapeRich(line.sub(i));
	return { text: out, state: { block, wantName } };
}

export function highlightCode(source: string, language: CodeLanguage, colors: CodeColors): string {
	if (language === "text") return escapeRich(source);
	let out = "";
	let state: Scan = { wantName: false };
	let start = 1;
	let first = true;
	const n = source.size();
	const emit = (line: string) => {
		const step = scanLine(line, language, state, colors);
		if (!first) out += "\n";
		first = false;
		out += step.text;
		state = step.state;
	};
	for (let i = 1; i <= n; i++) {
		if (source.sub(i, i) === "\n") {
			emit(source.sub(start, i - 1));
			start = i + 1;
		}
	}
	emit(source.sub(start, n));
	return out;
}

const HEX = "0123456789ABCDEF";

export function colorHex(color: Color3): string {
	const byte = (channel: number) => {
		const value = math.clamp(math.floor(channel * 255 + 0.5), 0, 255);
		const hi = math.floor(value / 16);
		return HEX.sub(hi + 1, hi + 1) + HEX.sub((value % 16) + 1, (value % 16) + 1);
	};
	return `#${byte(color.R)}${byte(color.G)}${byte(color.B)}`;
}
