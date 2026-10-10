String.prototype.size = function size() {
	return this.length;
};
String.prototype.sub = function sub(start, finish) {
	if (finish === undefined) return this.slice(start - 1);
	return this.slice(start - 1, finish);
};
Array.prototype.size = function size() {
	return this.length;
};
globalThis.math = {
	min: Math.min,
	max: Math.max,
	floor: Math.floor,
	clamp: (value, min, max) => Math.min(Math.max(value, min), max),
};

import { readFileSync } from "node:fs";

const { highlightCode } = await import("../src/ui/packages/codeEditor/highlightCode.ts");

const colors = {
	keyword: "#111111",
	string: "#222222",
	number: "#333333",
	comment: "#444444",
	func: "#555555",
};

function assert(cond, label, text) {
	if (!cond) throw new Error(`${label}\n${text ?? ""}`);
}

function balanced(text, label) {
	const fonts = text.split("<font").length - 1;
	const fontsEnd = text.split("</font>").length - 1;
	assert(fonts === fontsEnd, `${label} font tags`, text);
	const bold = text.split("<b>").length - 1;
	const boldEnd = text.split("</b>").length - 1;
	assert(bold === boldEnd, `${label} bold tags`, text);
	const leftovers = text.replace(/<\/?font[^>]*>/g, "").replace(/<\/?b>/g, "");
	assert(!leftovers.includes("<") && !leftovers.includes(">"), `${label} raw markup`, leftovers);
}

function has(text, needle, label) {
	assert(text.includes(needle), label, text);
	balanced(text, label);
}

const kw = (word) => `<font color="#111111"><b>${word}</b></font>`;
const str = (body) => `<font color="#222222">${body}</font>`;
const num = (body) => `<font color="#333333">${body}</font>`;
const note = (body) => `<font color="#444444">${body}</font>`;
const fn = (body) => `<font color="#555555">${body}</font>`;

const luau = highlightCode("local function ready()\n\treturn true\nend", "luau", colors);
has(luau, kw("local"), "luau local");
has(luau, kw("function"), "luau function");
has(luau, fn("ready"), "luau name");
has(luau, kw("return"), "luau return");
has(luau, kw("true"), "luau true");
has(luau, kw("end"), "luau end");
has(highlightCode("local x = nil", "luau", colors), kw("nil"), "luau nil");

const ts = highlightCode('function ready() {\n\tconst n = 1;\n\treturn "ok";\n}', "ts", colors);
has(ts, kw("function"), "ts function");
has(ts, fn("ready"), "ts name");
has(ts, kw("const"), "ts const");
has(ts, num("1"), "ts number");
has(ts, str("&quot;ok&quot;"), "ts string");
has(highlightCode("const gone = null", "ts", colors), kw("null"), "ts null");
has(highlightCode("const no = false", "ts", colors), kw("false"), "ts false");
has(highlightCode("const u = undefined", "ts", colors), kw("undefined"), "ts undefined");

const json = highlightCode('{ "ok": true, "n": 2, "name": null }', "json", colors);
has(json, str("&quot;ok&quot;"), "json string");
has(json, kw("true"), "json true");
has(json, num("2"), "json number");
has(json, kw("null"), "json null");
assert(!json.includes(fn("ok")), "json does not paint keys as functions", json);

const plain = highlightCode('local function ready()\na < b & c > "d" \'e\'', "text", colors);
assert(!plain.includes("<font") && !plain.includes("<b>"), "text has no color", plain);
assert(plain === "local function ready()\na &lt; b &amp; c &gt; &quot;d&quot; &apos;e&apos;", "text escapes", plain);

const broken = highlightCode('local s = "a<b>"', "luau", colors);
has(broken, kw("local"), "escape keeps keyword");
has(broken, str("&quot;a&lt;b&gt;&quot;"), "escape string markup");
assert(broken.split("<b>").length - 1 === 1, "user bold is not a tag", broken);

const quoted = highlightCode('local s = "say \\"hi\\""', "luau", colors);
has(quoted, str("&quot;say \\&quot;hi\\&quot;&quot;"), "escaped quote stays in the string");

const url = highlightCode('local s = "http://x"\nlocal y = 1', "luau", colors);
has(url, str("&quot;http://x&quot;"), "slashes inside a string");
has(url, kw("local"), "keyword after a string");
assert(url.split(kw("local")).length - 1 === 2, "both locals", url);

const openString = highlightCode('local s = "hello', "luau", colors);
has(openString, kw("local"), "unterminated string still has a keyword");
has(openString, str("&quot;hello"), "unterminated string eats the line");
assert(!openString.includes("&quot;hello&quot;"), "unterminated string has no closer", openString);

const lineComment = highlightCode("local x = 1 -- trailing\nstill", "luau", colors);
has(lineComment, note("-- trailing"), "luau line comment");
has(lineComment, num("1"), "number before a comment");
assert(lineComment.endsWith("\nstill"), "line comment does not cross", lineComment);

const blockComment = highlightCode("local x = 1 --[[ oops\nstill\n]]\nreturn true", "luau", colors);
has(blockComment, note("still"), "unterminated luau block stays a comment");
has(blockComment, kw("return"), "code after a closed block");

const tsBlock = highlightCode("/* hi\nstill", "ts", colors);
has(tsBlock, note("still"), "unterminated ts block");
const tsClosed = highlightCode("/* hi */ const n = 1", "ts", colors);
has(tsClosed, kw("const"), "code after ts block");
has(tsClosed, num("1"), "number after ts block");

const jsonComment = highlightCode('{\n\t"a": 1 // note\n}', "json", colors);
has(jsonComment, note("// note"), "json line comment");
has(jsonComment, num("1"), "json number before comment");

const named = highlightCode("function\nready()", "luau", colors);
has(named, fn("ready"), "name on the next line");

const long = highlightCode("local ".repeat(400), "luau", colors);
assert(!long.includes("<font") && long.includes("local"), "long line stays plain", long);

const view = readFileSync("src/ui/packages/codeEditor/components/CodeEditor.tsx", "utf8");
assert(view.includes("TextTransparency={colored ? 1 : 0}"), "plain text while focused");
assert(view.includes("Rotation={90}"), "caret points down");
assert(view.includes("fontSizes.caption"), "caret sized to the label");
assert(view.includes("highlightCode"), "editor paints with the tokenizer");

const markdown = readFileSync("src/ui/packages/markdown/components/Markdown.tsx", "utf8");
assert(markdown.includes("<CodeEditor") && markdown.includes("readOnly"), "fences use the editor");

console.log("highlight code ok");
