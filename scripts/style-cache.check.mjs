globalThis.typeOf = (value) => (typeof value === "object" && value !== null ? "table" : typeof value);
globalThis.pairs = (record) => Object.keys(record).map((key) => [key, record[key]]);
globalThis.tostring = (value) => String(value);

const { clearStyleCaches, createStyleCache, styleDepsKey } = await import(
	"../src/theme/styles/utilities/styleCache.ts"
);

if (styleDepsKey(undefined) !== styleDepsKey({})) throw new Error("empty deps");
if (styleDepsKey({ size: "small", onClick: () => {} }) !== "onClick=*\0size=small") {
	throw new Error(`deps ${styleDepsKey({ size: "small", onClick: () => {} })}`);
}
if (styleDepsKey({ b: 1, a: true }) !== "a=true\0b=1") throw new Error("sorted deps");
const adornment = styleDepsKey({ startAdornment: { kind: "icon" } });
if (adornment !== "startAdornment=*") throw new Error("node presence");

const light = { type: "light" };
const dark = { type: "dark" };
const read = createStyleCache();
let builds = 0;
const first = read(light, "size=small", () => {
	builds += 1;
	return { n: builds };
});
const second = read(light, "size=small", () => {
	builds += 1;
	return { n: builds };
});
if (first !== second || builds !== 1) throw new Error("same theme and deps");
const other = read(dark, "size=small", () => {
	builds += 1;
	return { n: builds };
});
if (other === first || builds !== 2) throw new Error("theme split");
const changed = read(light, "size=large", () => {
	builds += 1;
	return { n: builds };
});
if (changed === first || builds !== 3) throw new Error("deps split");

clearStyleCaches();
const afterClear = read(light, "size=small", () => {
	builds += 1;
	return { n: builds };
});
if (afterClear === first || builds !== 4) throw new Error("clearStyleCaches");

console.log("style cache ok");
