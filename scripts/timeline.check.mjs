import { readFileSync } from "node:fs";

const { timelineRail, timelineTone } = await import("../src/ui/packages/timeline/components/timelineRail.ts");

if (timelineRail(0, 3) !== true) throw new Error("first connects");
if (timelineRail(1, 3) !== true) throw new Error("middle connects");
if (timelineRail(2, 3) !== false) throw new Error("last stops");
if (timelineRail(0, 1) !== false) throw new Error("single");
if (timelineRail(0, 0) !== false) throw new Error("empty");
if (timelineRail(-1, 3) !== false) throw new Error("negative");
if (timelineTone("done") !== "done") throw new Error("done");
if (timelineTone("active") !== "active") throw new Error("active");
if (timelineTone("error") !== "error") throw new Error("error");
if (timelineTone("pending") !== "pending") throw new Error("pending");
if (timelineTone("nope") !== "pending") throw new Error("fallback");
if (timelineTone(undefined) !== "pending") throw new Error("missing");

const styles = readFileSync("src/ui/packages/timeline/components/Timeline.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/timeline/components/Timeline.tsx", "utf8");
if (!styles.includes('componentStyles("Timeline"')) throw new Error("override name");
if (!view.includes("<SxHost")) throw new Error("sx host");
if (!styles.includes("TextTruncate") || !styles.includes("PaddingLeft")) throw new Error("rail stays inside the padding");
if (!view.includes("styles.inset")) throw new Error("timeline inset");

console.log("timeline ok");
