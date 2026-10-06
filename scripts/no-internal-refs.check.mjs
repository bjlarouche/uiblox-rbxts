import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname } from "node:path";

const root = process.cwd();
// PR text is scanned via --pr in CI.
const SKIP_EXTS = new Set([
	".png",
	".jpg",
	".jpeg",
	".gif",
	".webp",
	".rbxm",
	".rbxmx",
	".tgz",
	".zip",
	".wasm",
]);

// Built from parts so this file does not contain the denylist literals itself.
const localUser = ["bla", "rouche"].join("");
const homeUsers = ["/", "Users", "/"].join("");
const npmTok = ["~/", ".", "npm", "-tokens"].join("");
const cursorDir = [".", "cur", "sor", "/"].join("");
const assetsDir = ["storyblox", "-", "assets"].join("");

const RULES = [
	{ id: "creator-hub", re: new RegExp("creator[\\s_-]?hub|creatorhub", "i") },
	{ id: "lua-apps", re: new RegExp("lua[\\s_-]?apps|luaapps", "i") },
	{ id: "grasshopper", re: new RegExp("grasshopper", "i") },
	{ id: "artifactory", re: new RegExp("artifactory", "i") },
	{ id: "atlassian", re: new RegExp("roblox\\.atlassian", "i") },
	{ id: "sourcegraph", re: new RegExp("sourcegraph", "i") },
	{ id: "github-roblox", re: new RegExp("github\\.com/Roblox/", "i") },
	{ id: "rbx-com", re: new RegExp("(?:^|[^\\w.])rbx\\.com\\b", "i") },
	{ id: "go-link", re: new RegExp("\\bgo/[a-z][a-z0-9_-]{1,64}\\b", "i") },
	{ id: "foundation-ui", re: new RegExp("foundation[\\s_-]?ui\\b|foundationui\\b|@rbx/ui\\b", "i") },
	// Local machine / personal identity (not the public GitHub user bjlarouche)
	{ id: "local-user", re: new RegExp(localUser, "i") },
	{ id: "home-users", re: new RegExp(homeUsers) },
	{ id: "npm-tokens", re: new RegExp(npmTok.replace(".", "\\."), "i") },
	{ id: "cursor-dir", re: new RegExp(cursorDir.replace(".", "\\."), "i") },
	{ id: "capture-assets", re: new RegExp(assetsDir, "i") },
	// Agent / AI process leaks (tight; avoid words like plain "cursor" or "agent")
	{ id: "subagent", re: new RegExp("\\b" + ["sub", "agent"].join("") + "s?\\b", "i") },
	{ id: "claude", re: new RegExp("\\b" + ["cla", "ude"].join("") + "\\b", "i") },
	{ id: "chatgpt", re: new RegExp("\\b" + ["chat", "gpt"].join("") + "\\b|\\b" + ["gpt", "-"].join("") + "[0-9]", "i") },
	{ id: "cursor-agent", re: new RegExp(["cur", "sor", "agent"].join("") + "|co-authored-by:\\s*" + ["cur", "sor"].join(""), "i") },
	{ id: "ai-audit", re: new RegExp("\\bai\\s*audits?\\b|\\bai\\s*reviews?\\b|\\bviewport\\s*audit\\b|\\bself-review\\b", "i") },
	{ id: "mcp-tooling", re: new RegExp("\\b" + ["M", "C", "P"].join("") + "\\b") },
];

/** path -> allowed rule ids (documented false positives) */
const ALLOW = {
	"scripts/pack-check.mjs": new Set(["artifactory"]),
};
const SKIP_FILES = new Set(["scripts/no-internal-refs.check.mjs"]);

const hits = [];

function scanText(label, text) {
	const lines = text.split(/\r?\n/);
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		for (const rule of RULES) {
			if (rule.re.test(line)) hits.push(`${label}:${i + 1} [${rule.id}] ${line.trim()}`);
		}
	}
}

function scanFile(file) {
	const rel = file.split("\\").join("/");
	if (SKIP_FILES.has(rel) || SKIP_EXTS.has(extname(rel).toLowerCase())) return;
	const allowed = ALLOW[rel];
	let text;
	try {
		text = readFileSync(file, "utf8");
	} catch {
		return;
	}
	if (text.includes("\0")) return;
	const lines = text.split(/\r?\n/);
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		for (const rule of RULES) {
			if (allowed?.has(rule.id)) continue;
			if (rule.re.test(line)) hits.push(`${rel}:${i + 1} [${rule.id}] ${line.trim()}`);
		}
	}
}

function scanTracked() {
	const files = execSync("git ls-files -z", { encoding: "utf8", cwd: root })
		.split("\0")
		.filter(Boolean);
	for (const file of files) scanFile(file);
}

function scanPr() {
	const eventPath = process.env.GITHUB_EVENT_PATH;
	if (!eventPath || !existsSync(eventPath)) {
		console.log("no-internal-refs pr: skip (no GITHUB_EVENT_PATH)");
		return;
	}
	const event = JSON.parse(readFileSync(eventPath, "utf8"));
	const pr = event.pull_request;
	if (!pr) {
		console.log("no-internal-refs pr: skip (not a pull_request event)");
		return;
	}
	scanText("pr:title", pr.title || "");
	scanText("pr:body", pr.body || "");
	const range = `${pr.base.sha}..${pr.head.sha}`;
	const log = execSync(`git log --format=%H%x1f%s%x1f%b%x1e ${range}`, {
		encoding: "utf8",
		cwd: root,
	});
	for (const entry of log.split("\x1e").filter(Boolean)) {
		const [hash, subject, body] = entry.split("\x1f");
		scanText(`commit:${hash.slice(0, 7)}:subject`, subject || "");
		scanText(`commit:${hash.slice(0, 7)}:body`, body || "");
	}
}

if (process.argv.includes("--pr")) scanPr();
else scanTracked();

if (hits.length) {
	console.error("internal reference denylist hit:");
	for (const hit of hits) console.error(`  ${hit}`);
	process.exit(1);
}
console.log(process.argv.includes("--pr") ? "no-internal-refs pr ok" : "no-internal-refs ok");
