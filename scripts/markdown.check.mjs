String.prototype.lower = function lower() {
	return this.toLowerCase();
};
String.prototype.sub = function sub(start, finish) {
	if (finish === undefined) return this.slice(start - 1);
	return this.slice(start - 1, finish);
};
String.prototype.size = function size() {
	return this.length;
};
String.prototype.find = function find(needle, start = 1, plain = false) {
	const from = Math.max(0, start - 1);
	if (plain) {
		const at = this.indexOf(needle, from);
		return at === -1 ? [undefined] : [at + 1];
	}
	const at = this.indexOf(needle, from);
	return at === -1 ? [undefined] : [at + 1];
};
String.prototype.gsub = function gsub(pattern, repl) {
	if (typeof pattern === "string") return [this.split(pattern).join(repl), 0];
	return [this.replace(pattern, repl), 0];
};
Array.prototype.size = function size() {
	return this.length;
};
Array.prototype.join = Array.prototype.join;
globalThis.tonumber = (v) => {
	const n = Number(v);
	return Number.isFinite(n) ? n : undefined;
};

const { parseMarkdown, inlinesToPlain, inlinesToRichText } = await import(
	"../src/ui/packages/markdown/parseMarkdown.ts",
);
const { htmlToMarkdown } = await import("../src/ui/packages/markdown/htmlToMarkdown.ts");
const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");

function kinds(source) {
	return parseMarkdown(source).map((b) => b.kind);
}

if (JSON.stringify(kinds("# Title\n\nPara")) !== JSON.stringify(["heading", "paragraph"])) {
	throw new Error("heading+paragraph");
}
if (kinds("## Sub")[0] !== "heading") throw new Error("h2");
if (kinds("---")[0] !== "hr") throw new Error("hr");
if (kinds("```\ncode\n```")[0] !== "code") throw new Error("fence");
if (kinds("- a\n- b")[0] !== "list") throw new Error("ul");
if (kinds("1. a\n2. b")[0] !== "list") throw new Error("ol");
if (kinds("> quote")[0] !== "blockquote") throw new Error("quote");
if (parseMarkdown("").size() !== 0) throw new Error("empty");

const bold = parseMarkdown("**bold** *it* `code` [go](https://x.test)");
const inlines = bold[0].inlines;
if (inlines[0].kind !== "bold" || inlines[0].text !== "bold") throw new Error("bold");
if (inlines[2].kind !== "italic") throw new Error("italic");
if (inlines[4].kind !== "code") throw new Error("inline code");
if (inlines[6].kind !== "link" || inlines[6].href !== "https://x.test") throw new Error("link");

const rich = inlinesToRichText(inlines);
if (!rich.includes("<b>bold</b>") || !rich.includes("<i>it</i>")) throw new Error("rich text");

const junk = parseMarkdown("<script>alert(1)</script>\nnot html mode");
if (junk[0].kind !== "paragraph") throw new Error("unsupported stays text");
if (!inlinesToPlain(junk[0].inlines).includes("script")) throw new Error("junk text kept");

const md = htmlToMarkdown(
	"<h1>Title</h1><p>Hello <strong>world</strong> and <em>friends</em>.</p><ul><li>One</li><li>Two</li></ul><pre><code>x=1</code></pre><hr/><blockquote>Note</blockquote><p><a href=\"https://x.test\">Docs</a></p>",
);
if (!md.includes("# Title")) throw new Error("html h1");
if (!md.includes("**world**")) throw new Error("html strong");
if (!md.includes("Hello **world** and *friends*.")) throw new Error("html spaces");
if (!md.includes("*friends*")) throw new Error("html em");
if (!md.includes("- One")) throw new Error("html ul");
if (!md.includes("```")) throw new Error("html pre");
if (!md.includes("---")) throw new Error("html hr");
if (!md.includes("> Note")) throw new Error("html quote");
if (!md.includes("[Docs](https://x.test)")) throw new Error("html link");

const round = parseMarkdown(md);
if (round.size() < 5) throw new Error("round-trip blocks");
for (const block of round) {
	if (block.kind === "paragraph" || block.kind === "heading" || block.kind === "blockquote") {
		inlinesToRichText(block.inlines);
	}
}

const evil = htmlToMarkdown('<p>Hi</p><script>alert(1)</script><style>body{}</style><!--x--><p>Ok</p>');
if (evil.includes("alert") || evil.includes("body{}") || evil.includes("<!--")) throw new Error("strip script/style/comment");
if (!evil.includes("Hi") || !evil.includes("Ok")) throw new Error("kept text");

const unknown = htmlToMarkdown("<div><span>Loose</span></div>");
if (!unknown.includes("Loose")) throw new Error("unwrap unknown");

// mode switching must not drop value — pure data contract
let value = "# Keep\n\ntext";
const modes = ["split", "edit", "preview"];
for (const mode of modes) {
	if (value !== "# Keep\n\ntext") throw new Error(`mode ${mode} dropped value`);
}

for (const name of ["default", "empty"]) {
	if (!stateMatrix.some((row) => row.component === "Markdown" && row.name.includes(name))) {
		throw new Error(`Markdown missing ${name}`);
	}
}
for (const name of ["split", "edit", "preview", "density-compact"]) {
	if (!stateMatrix.some((row) => row.component === "MarkdownEditor" && row.name.includes(name))) {
		throw new Error(`MarkdownEditor missing ${name}`);
	}
}

console.log("markdown ok");
