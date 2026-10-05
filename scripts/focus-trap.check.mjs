const { pickFocus } = await import("../src/ui/packages/modal/components/focusTrap.ts");

const outside = { id: "out", selectable: true };
const title = { id: "title", selectable: false };
const cancel = { id: "cancel", selectable: true };
const ok = { id: "ok", selectable: true };
const nodes = [title, cancel, ok];
const selectable = (node) => node.selectable;

if (pickFocus(nodes, cancel, true, selectable) !== cancel) throw new Error("keep inside");
if (pickFocus(nodes, outside, false, selectable) !== cancel) throw new Error("pull inside");
if (pickFocus([title], outside, false, selectable) !== undefined) throw new Error("none selectable");

console.log("focus trap ok");
