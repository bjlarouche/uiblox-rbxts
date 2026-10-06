Array.prototype.size = function size() {
	return this.length;
};
globalThis.math = { huge: Infinity, max: Math.max, min: Math.min, floor: Math.floor, clamp: (value, min, max) => Math.min(max, Math.max(min, value)) };
globalThis.Enum = {
	UserInputType: {
		MouseButton1: "MouseButton1",
		MouseMovement: "MouseMovement",
		Touch: "Touch",
		Keyboard: "Keyboard",
	},
};

const { hitRect, isReorderMove, isReorderPress, isReorderRelease, passedDragThreshold, placeItem, transferId } = await import(
	"../src/ui/packages/reorder/reorder.ts"
);

if (!isReorderPress(Enum.UserInputType.MouseButton1) || !isReorderPress(Enum.UserInputType.Touch)) throw new Error("press");
if (isReorderPress(Enum.UserInputType.Keyboard)) throw new Error("keyboard press");
if (!isReorderMove(Enum.UserInputType.MouseMovement) || !isReorderMove(Enum.UserInputType.Touch)) throw new Error("move");
if (!isReorderRelease(Enum.UserInputType.MouseButton1) || !isReorderRelease(Enum.UserInputType.Touch)) throw new Error("release");
if (passedDragThreshold(0, 0, 3, 4)) throw new Error("under threshold");
if (!passedDragThreshold(0, 0, 6, 0)) throw new Error("over threshold");

const column = { id: "col:Doing", x: 0, y: 0, width: 200, height: 400 };
const card = { id: "task-a", x: 10, y: 40, width: 180, height: 80 };
if (hitRect([column, card], 20, 50) !== "task-a") throw new Error("card beats column");
if (hitRect([column, card], 20, 10) !== "col:Doing") throw new Error("column header");
if (hitRect([column, card], 500, 10) !== undefined) throw new Error("miss");

const forward = placeItem(["a", "b", "c"], 0, 2);
if (forward.join(",") !== "b,c,a") throw new Error("move forward");
const backward = placeItem(["a", "b", "c"], 2, 0);
if (backward.join(",") !== "c,a,b") throw new Error("move backward");
if (placeItem(["a", "b"], 0, 0).join(",") !== "a,b") throw new Error("same index");
if (placeItem(["a", "b"], -1, 0).join(",") !== "a,b") throw new Error("bad index");

const moved = transferId(["a", "b"], ["c"], "a", 1);
if (moved.source.join(",") !== "b" || moved.dest.join(",") !== "c,a") throw new Error("transfer");
const inserted = transferId(["a", "b"], ["c", "d"], "b", 0);
if (inserted.dest.join(",") !== "b,c,d") throw new Error("insert front");
const missing = transferId(["a"], ["c"], "z", 0);
if (missing.source.join(",") !== "a" || missing.dest.join(",") !== "c") throw new Error("missing id");
const list = ["a", "b", "c"];
const same = transferId(list, list, "a", 2);
if (same.source !== same.dest || same.dest.join(",") !== "b,c,a") throw new Error("same list");

console.log("reorder ok");
