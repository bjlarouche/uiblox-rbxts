function trim(value: string): string {
	let start = 1;
	let stop = value.size();
	while (start <= stop) {
		const ch = value.sub(start, start);
		if (ch !== " " && ch !== "\t" && ch !== "\r" && ch !== "\n") break;
		start += 1;
	}
	while (stop >= start) {
		const ch = value.sub(stop, stop);
		if (ch !== " " && ch !== "\t" && ch !== "\r" && ch !== "\n") break;
		stop -= 1;
	}
	if (start > stop) return "";
	return value.sub(start, stop);
}

function decodeEntities(value: string): string {
	let out = value;
	for (const [from, to] of [
		["&lt;", "<"],
		["&gt;", ">"],
		["&amp;", "&"],
		["&quot;", '"'],
		["&nbsp;", " "],
	] as const) {
		const [replaced] = out.gsub(from, to);
		out = replaced;
	}
	return out;
}

function collapseSpace(value: string): string {
	let out = "";
	let gap = false;
	for (let i = 1; i <= value.size(); i++) {
		const ch = value.sub(i, i);
		if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
			gap = true;
			continue;
		}
		if (gap) {
			out = `${out} `;
			gap = false;
		}
		out = `${out}${ch}`;
	}
	if (gap) out = `${out} `;
	return out;
}

function attr(tag: string, name: string): string | undefined {
	const needle = `${name}="`;
	const found = tag.lower().find(needle, 1, true);
	const at = found[0];
	if (at === undefined) return undefined;
	const start = at + needle.size();
	const close = tag.find('"', start, true);
	const endAt = close[0];
	if (endAt === undefined) return undefined;
	return tag.sub(start, endAt - 1);
}

type Tok =
	| { kind: "text"; text: string }
	| { kind: "open"; name: string; raw: string }
	| { kind: "close"; name: string }
	| { kind: "void"; name: string };

function tokenize(html: string): Tok[] {
	const toks: Tok[] = [];
	let i = 1;
	const n = html.size();
	while (i <= n) {
		const lt = html.find("<", i, true);
		const ltAt = lt[0];
		if (ltAt === undefined) {
			toks.push({ kind: "text", text: html.sub(i) });
			break;
		}
		if (ltAt > i) toks.push({ kind: "text", text: html.sub(i, ltAt - 1) });
		const gt = html.find(">", ltAt + 1, true);
		const gtAt = gt[0];
		if (gtAt === undefined) {
			toks.push({ kind: "text", text: html.sub(ltAt) });
			break;
		}
		const raw = html.sub(ltAt + 1, gtAt - 1);
		if (raw.sub(1, 3) === "!--") {
			i = gtAt + 1;
			continue;
		}
		const isClose = raw.sub(1, 1) === "/";
		const body = isClose ? raw.sub(2) : raw;
		let nameEnd = 1;
		while (nameEnd <= body.size()) {
			const c = body.sub(nameEnd, nameEnd);
			if (c === " " || c === "\t" || c === "/" || c === "\n" || c === "\r") break;
			nameEnd += 1;
		}
		const name = body.sub(1, nameEnd - 1).lower();
		const selfClose = !isClose && (body.sub(body.size(), body.size()) === "/" || name === "br" || name === "hr");
		if (name === "script" || name === "style") {
			if (!isClose && !selfClose) {
				const closer = `</${name}>`;
				const closeTag = html.lower().find(closer, gtAt + 1, true);
				const endAt = closeTag[0];
				i = endAt !== undefined ? endAt + closer.size() : gtAt + 1;
				continue;
			}
			i = gtAt + 1;
			continue;
		}
		if (isClose) toks.push({ kind: "close", name });
		else if (selfClose) toks.push({ kind: "void", name });
		else toks.push({ kind: "open", name, raw: body });
		i = gtAt + 1;
	}
	return toks;
}

function hashes(level: number): string {
	let out = "";
	for (let i = 0; i < level; i++) out = `${out}#`;
	return out;
}

/** Map a small HTML subset to the markdown preview subset. Unknown tags unwrap to text. */
export function htmlToMarkdown(html: string): string {
	const toks = tokenize(html);
	let out = "";
	let listOrdered: boolean | undefined;
	let listIndex = 0;
	let inPre = false;
	let pending = "";
	const hrefs: string[] = [];

	const flushPending = () => {
		const t = trim(pending);
		pending = "";
		if (t.size() > 0) out = `${out}${t}\n\n`;
	};
	const pushInline = (text: string) => {
		pending = `${pending}${text}`;
	};

	for (const tok of toks) {
		if (tok.kind === "text") {
			if (inPre) pending = `${pending}${tok.text}`;
			else pushInline(collapseSpace(decodeEntities(tok.text)));
			continue;
		}

		const name = tok.name;
		if (tok.kind === "void") {
			if (name === "br") pushInline("  \n");
			else if (name === "hr") {
				flushPending();
				out = `${out}---\n\n`;
			}
			continue;
		}

		if (tok.kind === "open") {
			if (name.size() === 2 && name.sub(1, 1) === "h") {
				const level = tonumber(name.sub(2));
				if (level !== undefined && level >= 1 && level <= 6) {
					flushPending();
					pending = `${hashes(level)} `;
				}
			} else if (name === "p") flushPending();
			else if (name === "strong" || name === "b") pushInline("**");
			else if (name === "em" || name === "i") pushInline("*");
			else if (name === "code" && !inPre) pushInline("`");
			else if (name === "pre") {
				flushPending();
				inPre = true;
				pending = "```\n";
			} else if (name === "a") {
				pushInline("[");
				hrefs.push(attr(tok.raw, "href") ?? "");
			} else if (name === "ul") {
				flushPending();
				listOrdered = false;
				listIndex = 0;
			} else if (name === "ol") {
				flushPending();
				listOrdered = true;
				listIndex = 0;
			} else if (name === "li") {
				flushPending();
				if (listOrdered === true) {
					listIndex += 1;
					pending = `${listIndex}. `;
				} else pending = "- ";
			} else if (name === "blockquote") {
				flushPending();
				pending = "> ";
			}
			continue;
		}

		if (name.size() === 2 && name.sub(1, 1) === "h") flushPending();
		else if (name === "p") flushPending();
		else if (name === "strong" || name === "b") pushInline("**");
		else if (name === "em" || name === "i") pushInline("*");
		else if (name === "code" && !inPre) pushInline("`");
		else if (name === "pre") {
			inPre = false;
			if (pending.size() > 0 && pending.sub(pending.size()) !== "\n") pending = `${pending}\n`;
			pending = `${pending}\`\`\``;
			flushPending();
		} else if (name === "a") {
			const href = hrefs.pop() ?? "";
			pushInline(`](${href})`);
		} else if (name === "ul" || name === "ol") {
			flushPending();
			listOrdered = undefined;
			listIndex = 0;
		} else if (name === "li" || name === "blockquote") flushPending();
	}
	flushPending();
	const result = trim(out);
	return result.size() > 0 ? `${result}\n` : "";
}
