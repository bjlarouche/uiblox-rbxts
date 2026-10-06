const { copyInvoke } = await import("../src/ui/packages/copyButton/components/copyInvoke.ts");

let seen;
copyInvoke("cove lamp", (text) => {
	seen = text;
});
if (seen !== "cove lamp") throw new Error("copy text");
if (copyInvoke("pier", undefined) !== undefined) throw new Error("missing copy");
copyInvoke("gate");

console.log("copy button ok");
