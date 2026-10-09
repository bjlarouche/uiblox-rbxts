const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "hover-underline", "disabled", "error"]) {
	if (!stateMatrix.some((row) => row.component === "Link" && row.name.includes(name))) {
		throw new Error(`Link missing ${name}`);
	}
}

const { readFileSync } = await import("node:fs");
const { join } = await import("node:path");
const link = readFileSync(join(process.cwd(), "src/ui/packages/link/components/Link.tsx"), "utf8");
const linkStyles = readFileSync(join(process.cwd(), "src/ui/packages/link/components/Link.styles.ts"), "utf8");
if (link.includes("<u>")) throw new Error("underline must not change the text");
if (!link.includes('key="Underline"')) throw new Error("link missing underline");
if (!linkStyles.includes("theme.palette.primary.main")) throw new Error("link missing primary color");
if (!linkStyles.includes("PaddingBottom: new UDim(0, 1)")) throw new Error("underline must reserve its line");

console.log("link ok");
