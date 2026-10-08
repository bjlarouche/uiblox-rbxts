import { readFileSync } from "node:fs";

const { avatarGroupCut } = await import("../src/ui/packages/avatarGroup/components/avatarGroupCut.ts");

if (avatarGroupCut(2, 4) !== 2) throw new Error("short list");
if (avatarGroupCut(5, 4) !== 3) throw new Error("surplus leaves a slot");
if (avatarGroupCut(5, 2) !== 1) throw new Error("smallest cap");
if (avatarGroupCut(5, 1) !== 5) throw new Error("max below 2 shows all");
if (avatarGroupCut(5, undefined) !== 5) throw new Error("no max");
if (avatarGroupCut(0, 4) !== 0) throw new Error("empty");
if (avatarGroupCut(3, 0 / 0) !== 3) throw new Error("nan max");

const styles = readFileSync("src/ui/packages/avatarGroup/components/AvatarGroup.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/avatarGroup/components/AvatarGroup.tsx", "utf8");
if (!styles.includes('componentStyles<{ size?: number; variant?: AvatarVariant }>(\n\t"AvatarGroup"')) {
	throw new Error("override name");
}
if (!view.includes("<SxHost")) throw new Error("sx host");

console.log("avatar group ok");
