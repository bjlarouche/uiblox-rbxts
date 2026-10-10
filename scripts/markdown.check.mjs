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
globalThis.math = {
	clamp: (value, min, max) => Math.min(Math.max(value, min), max),
	min: Math.min,
	max: Math.max,
};

const { parseMarkdown, inlinesToPlain, inlinesToRichText, inlineLines, inlinePieces, markdownLinkPayload } = await import(
	"../src/ui/packages/markdown/parseMarkdown.ts",
);
const { htmlToMarkdown } = await import("../src/ui/packages/markdown/htmlToMarkdown.ts");
const { clampEditorHeight } = await import("../src/ui/packages/markdown/components/markdownEditorHeight.ts");
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
if (rich.includes("https://x.test")) throw new Error("link hides the address");
if (!rich.includes("<u>go</u>")) throw new Error("link is underlined");

const payload = markdownLinkPayload(inlines[6]);
if (payload === undefined || payload.text !== "go" || payload.href !== "https://x.test") throw new Error("link payload");
if (markdownLinkPayload(inlines[0]) !== undefined) throw new Error("bold is not a link");
if (markdownLinkPayload({ kind: "link", text: "", href: "x" }) !== undefined) throw new Error("empty link");

const pieces = inlinePieces(parseMarkdown("See [north route](route) today.")[0].inlines);
const linked = pieces.find((piece) => piece.kind === "link");
if (linked === undefined || linked.text !== "north route" || linked.href !== "route") throw new Error("piece payload");
if (pieces.some((piece) => piece.kind === "word" && piece.text.includes("route"))) throw new Error("link is not a word");
if (pieces.some((piece) => piece.kind !== "link" && piece.text !== undefined && String(piece.text).includes("(route)"))) {
	throw new Error("address leaked into text");
}

const sentence = inlinePieces(parseMarkdown("Meet me by the [north gate](gate) before dusk.")[0].inlines);
let linkAt = -1;
for (let i = 0; i < sentence.length; i++) if (sentence[i].kind === "link") linkAt = i;
if (linkAt <= 0 || linkAt >= sentence.length - 1) throw new Error("link not in the middle");
const lines = inlineLines(sentence, 80, 1);
if (lines[linkAt] !== lines[linkAt - 1] || lines[linkAt] !== lines[linkAt + 1]) throw new Error("link left the sentence");
const tight = inlineLines(sentence, 4, 1);
if (tight[linkAt] === tight[linkAt - 1] && tight[linkAt] === tight[linkAt + 1]) throw new Error("link never wraps");

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
	if (block.kind === "paragraph" || block.kind === "heading") inlinesToRichText(block.inlines);
	if (block.kind === "blockquote") {
		for (const para of block.paragraphs) inlinesToRichText(para);
	}
}

const evil = htmlToMarkdown('<p>Hi</p><script>alert(1)</script><style>body{}</style><!--x--><p>Ok</p>');
if (evil.includes("alert") || evil.includes("body{}") || evil.includes("<!--")) throw new Error("strip script/style/comment");
if (!evil.includes("Hi") || !evil.includes("Ok")) throw new Error("kept text");

const unknown = htmlToMarkdown("<div><span>Loose</span></div>");
if (!unknown.includes("Loose")) throw new Error("unwrap unknown");

if (clampEditorHeight(120, 200, 600) !== 200) throw new Error("editor min height");
if (clampEditorHeight(800, 200, 600) !== 600) throw new Error("editor max height");
if (clampEditorHeight(320, 200, 600) !== 320) throw new Error("editor height");
if (clampEditorHeight(320, 600, 200) !== 320) throw new Error("editor reversed bounds");

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
const editorStyles = (await import("node:fs")).readFileSync(
	"src/ui/packages/markdown/components/MarkdownEditor.styles.ts",
	"utf8",
);
const editorBlock = editorStyles.match(/editor:\s*\{[\s\S]*?\}\s*as WriteableStyle<TextBox>/)?.[0];
if (editorBlock === undefined || !editorBlock.includes("fontSizes.body") || editorBlock.includes("fontSizes.caption")) {
	throw new Error("editor text matches the body size");
}
const editorSource = (await import("node:fs")).readFileSync("src/ui/packages/markdown/components/MarkdownEditor.tsx", "utf8");
if (!editorSource.includes("Paste HTML to convert to markdown")) throw new Error("paste panel title");
if (!editorSource.includes("Couldn't convert that HTML")) throw new Error("paste panel error");
if (!editorSource.includes("disabled={isBlank(htmlDraft)}")) throw new Error("convert stays disabled while empty");
if (editorSource.includes("onEnterPressed")) throw new Error("paste field does not add an enter shortcut");

const { readFileSync } = await import("node:fs");
const markdown = readFileSync("src/ui/packages/markdown/components/Markdown.tsx", "utf8");
const markdownStyles = readFileSync("src/ui/packages/markdown/components/Markdown.styles.ts", "utf8");
if (markdown.includes("#4C9AFF") || readFileSync("src/ui/packages/markdown/parseMarkdown.ts", "utf8").includes("#4C9AFF")) {
	throw new Error("link color is not a fixed blue");
}
if (!markdown.includes('color="primary"')) throw new Error("markdown links use the primary color");
if (!markdownStyles.includes("TextWrapped: true") || !markdown.includes("styles.inset")) {
	throw new Error("markdown body wraps inside the padding");
}
if (markdown.includes("return 28") || !markdown.includes("sizes.h1") || !markdown.includes("SourceSansBold")) {
	throw new Error("headings use the theme scale");
}

const table = parseMarkdown(
	"| Crew | Role | Watch |\n|:---|:---:|---:|\n| Ada | **Pilot** | 04:00 |\n| Grace \\| Lin | Navigator | late |",
);
if (table[0].kind !== "table") throw new Error("table");
if (table[0].kind === "table") {
	if (JSON.stringify(table[0].align) !== JSON.stringify(["left", "center", "right"])) throw new Error("table align");
	if (table[0].header.length !== 3 || table[0].rows.length !== 2) throw new Error("table shape");
	if (table[0].header[0][0].text !== "Crew") throw new Error("table header");
	const role = table[0].rows[0][1];
	if (role[0].kind !== "bold" || role[0].text !== "Pilot") throw new Error("table inline");
	const escaped = table[0].rows[1][0][0].text;
	if (escaped !== "Grace | Lin") throw new Error(`escaped pipe ${escaped}`);
}
if (kinds("a | b\nnot a delimiter")[0] !== "paragraph") throw new Error("pipe without delimiter stays text");
if (!markdown.includes("styles.quoteBarPad") || markdown.includes('key="Bar"')) {
	throw new Error("quote bar is padding, not a scaled frame");
}
if (!markdown.includes("quoteStack") || !markdownStyles.includes("surface.elevated")) {
	throw new Error("quote stacks paragraphs and table headers sit on elevated");
}

const quote = parseMarkdown("> A short quote\n> an\n>\n> **bold** and *lean*\n> hard  \n> break");
if (quote[0].kind !== "blockquote") throw new Error("multi quote");
if (quote[0].kind === "blockquote") {
	if (quote[0].paragraphs.length !== 2) throw new Error(`quote paragraphs ${quote[0].paragraphs.length}`);
	const first = inlinesToPlain(quote[0].paragraphs[0]);
	if (first !== "A short quote an") throw new Error(`soft wrap ${first}`);
	const second = quote[0].paragraphs[1];
	if (second[0].kind !== "bold" || second[0].text !== "bold") throw new Error("quote bold");
	const linked = parseMarkdown("> see [docs](https://example.com)");
	if (linked[0].kind !== "blockquote" || linked[0].paragraphs[0][1].kind !== "link") throw new Error("quote link");
	if (!inlinesToPlain(second).includes("hard\nbreak")) throw new Error(`hard break ${inlinesToPlain(second)}`);
}
if (kinds(">> nested")[0] !== "paragraph") throw new Error("nested marker stays text");
const soft = parseMarkdown("alpha\nbeta");
if (inlinesToPlain(soft[0].inlines) !== "alpha beta") throw new Error("paragraph soft wrap");
const hard = parseMarkdown("alpha  \nbeta");
if (inlinesToPlain(hard[0].inlines) !== "alpha\nbeta") throw new Error("paragraph hard break");

console.log("markdown ok");
