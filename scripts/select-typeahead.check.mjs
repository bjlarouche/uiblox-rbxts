String.prototype.lower = function lower() {
	return this.toLowerCase();
};
String.prototype.sub = function sub(start, finish) {
	return this.slice(start - 1, finish);
};
String.prototype.size = function size() {
	return this.length;
};
Array.prototype.size = function size() {
	return this.length;
};

const { typeaheadChoice } = await import("../src/ui/packages/select/components/selectTypeahead.ts");

const options = [
	{ label: "Apple" },
	{ label: "Apricot", disabled: true },
	{ label: "Banana" },
	{ label: "Berry" },
];

if (typeaheadChoice(options, -1, "b") !== 2) throw new Error("first match");
if (typeaheadChoice(options, 2, "b") !== 3) throw new Error("next match");
if (typeaheadChoice(options, 0, "ap") !== 0) throw new Error("prefix wraps to apple");
if (typeaheadChoice(options, 2, "zz") !== 2) throw new Error("no match");
if (typeaheadChoice(options, 0, "a") !== 0) throw new Error("skip disabled");

console.log("select typeahead ok");
