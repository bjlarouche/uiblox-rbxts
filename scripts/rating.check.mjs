import { readFileSync } from "node:fs";
import { join } from "node:path";

const rating = readFileSync(join(process.cwd(), "src/ui/packages/rating/components/Rating.tsx"), "utf8");
if (!rating.includes("focusRing")) throw new Error("rating focus should be a ring");
if (!rating.includes("primary.hover") || !rating.includes("primary.main")) throw new Error("rating hover and selected should differ");
if (!rating.includes("controlFade")) throw new Error("rating disabled fade");
if (rating.includes("text.disabled")) throw new Error("rating glyph should stay readable when disabled");

const { ratingCommit } = await import("../src/ui/packages/rating/components/ratingCommit.ts");
const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
if (ratingCommit(true, (value) => value, 4) !== undefined) throw new Error("read only still commits");
if (ratingCommit(false, undefined, 4) !== undefined) throw new Error("missing handler commits");
if (ratingCommit(undefined, (value) => value, 3) !== 3) throw new Error("editable commit");
if (ratingCommit(false, (value) => value, 0) !== 0) throw new Error("clear commit");
for (const name of ["default", "filled", "disabled", "size-small", "readonly"]) {
	if (!stateMatrix.some((row) => row.component === "Rating" && row.name.includes(name))) {
		throw new Error(`Rating missing ${name}`);
	}
}

console.log("rating ok");
