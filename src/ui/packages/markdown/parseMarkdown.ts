export type MdInline =
	| { kind: "text"; text: string }
	| { kind: "bold"; text: string }
	| { kind: "italic"; text: string }
	| { kind: "code"; text: string }
	| { kind: "link"; text: string; href: string };

export type MdBlock =
	| { kind: "heading"; level: number; inlines: MdInline[] }
	| { kind: "paragraph"; inlines: MdInline[] }
	| { kind: "code"; text: string }
	| { kind: "list"; ordered: boolean; items: MdInline[][] }
	| { kind: "blockquote"; inlines: MdInline[] }
	| { kind: "hr" };

function trimEnd(value: string): string {
	let stop = value.size();
	while (stop > 0) {
		const ch = value.sub(stop, stop);
		if (ch !== " " && ch !== "\t" && ch !== "\r") break;
		stop -= 1;
	}
	return value.sub(1, stop);
}

function trim(value: string): string {
	let start = 1;
	let stop = value.size();
	while (start <= stop) {
		const ch = value.sub(start, start);
		if (ch !== " " && ch !== "\t" && ch !== "\r") break;
		start += 1;
	}
	while (stop >= start) {
		const ch = value.sub(stop, stop);
		if (ch !== " " && ch !== "\t" && ch !== "\r") break;
		stop -= 1;
	}
	if (start > stop) return "";
	return value.sub(start, stop);
}

function headingLevel(line: string): number | undefined {
	let n = 0;
	while (n < line.size() && n < 6 && line.sub(n + 1, n + 1) === "#") n += 1;
	if (n === 0) return undefined;
	if (n < line.size() && line.sub(n + 1, n + 1) !== " ") return undefined;
	return n;
}

function parseInlines(source: string): MdInline[] {
	const out: MdInline[] = [];
	let i = 1;
	const n = source.size();
	let buf = "";

	const flush = () => {
		if (buf.size() > 0) {
			out.push({ kind: "text", text: buf });
			buf = "";
		}
	};

	while (i <= n) {
		const ch = source.sub(i, i);
		if (ch === "`") {
			const close = source.find("`", i + 1, true);
			const endAt = close[0];
			if (endAt !== undefined) {
				flush();
				out.push({ kind: "code", text: source.sub(i + 1, endAt - 1) });
				i = endAt + 1;
				continue;
			}
		}
		if (ch === "[") {
			const mid = source.find("](", i + 1, true);
			const midAt = mid[0];
			if (midAt !== undefined) {
				const closeParen = source.find(")", midAt + 2, true);
				const endAt = closeParen[0];
				if (endAt !== undefined) {
					flush();
					out.push({
						kind: "link",
						text: source.sub(i + 1, midAt - 1),
						href: source.sub(midAt + 2, endAt - 1),
					});
					i = endAt + 1;
					continue;
				}
			}
		}
		if (ch === "*" && i + 1 <= n && source.sub(i + 1, i + 1) === "*") {
			const close = source.find("**", i + 2, true);
			const endAt = close[0];
			if (endAt !== undefined) {
				flush();
				out.push({ kind: "bold", text: source.sub(i + 2, endAt - 1) });
				i = endAt + 2;
				continue;
			}
		}
		if (ch === "*" && (i === 1 || source.sub(i - 1, i - 1) !== "*")) {
			const close = source.find("*", i + 1, true);
			const endAt = close[0];
			if (endAt !== undefined && source.sub(endAt + 1, endAt + 1) !== "*") {
				flush();
				out.push({ kind: "italic", text: source.sub(i + 1, endAt - 1) });
				i = endAt + 1;
				continue;
			}
		}
		buf = `${buf}${ch}`;
		i += 1;
	}
	flush();
	return out.size() > 0 ? out : [{ kind: "text", text: "" }];
}

function isHr(line: string): boolean {
	const t = trim(line);
	if (t.size() < 3) return false;
	const ch = t.sub(1, 1);
	if (ch !== "-" && ch !== "*" && ch !== "_") return false;
	for (let i = 1; i <= t.size(); i++) {
		const c = t.sub(i, i);
		if (c !== ch && c !== " ") return false;
	}
	return true;
}

function listMarker(line: string): { ordered: boolean; rest: string } | undefined {
	const t = trim(line);
	if (t.size() >= 2 && (t.sub(1, 2) === "- " || t.sub(1, 2) === "* ")) {
		return { ordered: false, rest: t.sub(3) };
	}
	let i = 1;
	while (i <= t.size()) {
		const c = t.sub(i, i);
		if (c < "0" || c > "9") break;
		i += 1;
	}
	if (i > 1 && i + 1 <= t.size() && t.sub(i, i + 1) === ". ") {
		return { ordered: true, rest: t.sub(i + 2) };
	}
	return undefined;
}

/** Small markdown subset → blocks. Unsupported syntax stays plain text. */
export function parseMarkdown(source: string): MdBlock[] {
	const lines = source.split("\n");
	const blocks: MdBlock[] = [];
	let i = 0;

	while (i < lines.size()) {
		const raw = lines[i];
		const line = trimEnd(raw);
		if (trim(line) === "") {
			i += 1;
			continue;
		}

		if (line.size() >= 3 && line.sub(1, 3) === "```") {
			const body: string[] = [];
			i += 1;
			while (i < lines.size() && !(lines[i].size() >= 3 && trim(lines[i]).sub(1, 3) === "```")) {
				body.push(lines[i]);
				i += 1;
			}
			if (i < lines.size()) i += 1;
			blocks.push({ kind: "code", text: body.join("\n") });
			continue;
		}

		if (isHr(line)) {
			blocks.push({ kind: "hr" });
			i += 1;
			continue;
		}

		const level = headingLevel(line);
		if (level !== undefined) {
			blocks.push({ kind: "heading", level, inlines: parseInlines(trim(line.sub(level + 1))) });
			i += 1;
			continue;
		}

		if (line.sub(1, 1) === ">" && (line.size() === 1 || line.sub(2, 2) === " ")) {
			const parts: string[] = [];
			while (i < lines.size()) {
				const cur = trimEnd(lines[i]);
				if (!(cur.sub(1, 1) === ">" && (cur.size() === 1 || cur.sub(2, 2) === " "))) break;
				parts.push(cur.size() >= 2 ? cur.sub(3) : "");
				i += 1;
			}
			blocks.push({ kind: "blockquote", inlines: parseInlines(parts.join(" ")) });
			continue;
		}

		const marker = listMarker(line);
		if (marker !== undefined) {
			const ordered = marker.ordered;
			const items: MdInline[][] = [parseInlines(marker.rest)];
			i += 1;
			while (i < lines.size()) {
				const following = listMarker(trimEnd(lines[i]));
				if (following === undefined || following.ordered !== ordered) break;
				items.push(parseInlines(following.rest));
				i += 1;
			}
			blocks.push({ kind: "list", ordered, items });
			continue;
		}

		const para: string[] = [line];
		i += 1;
		while (i < lines.size()) {
			const cur = trimEnd(lines[i]);
			if (trim(cur) === "") break;
			if (cur.size() >= 3 && cur.sub(1, 3) === "```") break;
			if (isHr(cur)) break;
			if (headingLevel(cur) !== undefined) break;
			if (cur.sub(1, 1) === ">" && (cur.size() === 1 || cur.sub(2, 2) === " ")) break;
			if (listMarker(cur) !== undefined) break;
			// two trailing spaces = hard break
			const prev = para[para.size() - 1];
			if (prev.size() >= 2 && prev.sub(prev.size() - 1) === "  ") {
				para[para.size() - 1] = trimEnd(prev.sub(1, prev.size() - 2));
				para.push(cur);
			} else {
				para[para.size() - 1] = `${prev} ${cur}`;
			}
			i += 1;
		}
		blocks.push({ kind: "paragraph", inlines: parseInlines(para.join("\n")) });
	}

	return blocks;
}

export function inlinesToPlain(inlines: MdInline[]): string {
	let out = "";
	for (const part of inlines) {
		if (part.kind === "link") out = `${out}${part.text}`;
		else out = `${out}${part.text}`;
	}
	return out;
}

function escapeRich(text: string): string {
	let out = text;
	for (const [from, to] of [
		["&", "&amp;"],
		["<", "&lt;"],
		[">", "&gt;"],
	] as const) {
		const [replaced] = out.gsub(from, to);
		out = replaced;
	}
	return out;
}

/** Turn inline nodes into Roblox RichText. Links stay the label only. */
export function inlinesToRichText(inlines: MdInline[]): string {
	let out = "";
	for (const part of inlines) {
		if (part.kind === "text") {
			let chunk = escapeRich(part.text);
			const [withBreaks] = chunk.gsub("\n", "<br/>");
			out = `${out}${withBreaks}`;
		} else if (part.kind === "bold") {
			out = `${out}<b>${escapeRich(part.text)}</b>`;
		} else if (part.kind === "italic") {
			out = `${out}<i>${escapeRich(part.text)}</i>`;
		} else if (part.kind === "code") {
			out = `${out}<font face="RobotoMono">${escapeRich(part.text)}</font>`;
		} else if (part.kind === "link") {
			out = `${out}<u>${escapeRich(part.text)}</u>`;
		}
	}
	return out;
}

export interface MarkdownLinkPayload {
	text: string;
	href: string;
}

/** Click payload for a link inline. Other inlines are not activatable. */
export function markdownLinkPayload(inline: MdInline): MarkdownLinkPayload | undefined {
	if (inline.kind !== "link" || inline.text.size() === 0) return undefined;
	return { text: inline.text, href: inline.href };
}

export type MdPiece = { kind: "word"; text: string } | { kind: "link"; text: string; href: string } | { kind: "break" };

function richWord(kind: MdInline["kind"], word: string): string {
	const safe = escapeRich(word);
	if (kind === "bold") return `<b>${safe}</b>`;
	if (kind === "italic") return `<i>${safe}</i>`;
	if (kind === "code") return `<font face="RobotoMono">${safe}</font>`;
	return safe;
}

/** Split a line into words and link payloads so a link can take a click. */
export function inlinePieces(inlines: MdInline[]): MdPiece[] {
	const out: MdPiece[] = [];
	for (const part of inlines) {
		const link = markdownLinkPayload(part);
		if (link !== undefined) {
			out.push({ kind: "link", text: link.text, href: link.href });
			continue;
		}
		if (part.kind === "link") continue;
		let word = "";
		const flush = () => {
			if (word.size() === 0) return;
			out.push({ kind: "word", text: richWord(part.kind, word) });
			word = "";
		};
		const source = part.text;
		for (let i = 1; i <= source.size(); i++) {
			const ch = source.sub(i, i);
			if (ch === " " || ch === "\t" || ch === "\r") {
				flush();
				continue;
			}
			if (ch === "\n") {
				flush();
				out.push({ kind: "break" });
				continue;
			}
			word = `${word}${ch}`;
		}
		flush();
	}
	return out;
}

/** Line index of each piece. A piece wraps only when it does not fit beside the previous one. */
export function inlineLines(pieces: MdPiece[], maxWidth: number, gap = 1): number[] {
	const lineOf = new Array<number>();
	let line = 0;
	let used = 0;
	for (const piece of pieces) {
		if (piece.kind === "break") {
			lineOf.push(line);
			line += 1;
			used = 0;
			continue;
		}
		const width = piece.text.size();
		if (used > 0 && used + gap + width > maxWidth) {
			line += 1;
			used = width;
		} else if (used === 0) {
			used = width;
		} else {
			used += gap + width;
		}
		lineOf.push(line);
	}
	return lineOf;
}
