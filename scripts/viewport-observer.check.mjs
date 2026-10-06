Array.prototype.size = function size() {
	return this.length;
};
Array.prototype.remove = function remove(index) {
	this.splice(index, 1);
};
Array.prototype.clear = function clear() {
	this.length = 0;
};

const { clearViewportObservers, observeViewport } = await import("../src/hooks/viewportObserver.ts");

let connects = 0;
let disconnects = 0;
let handler;
const host = {
	AbsoluteSize: { X: 400, Y: 300 },
	GetPropertyChangedSignal(name) {
		if (name !== "AbsoluteSize") throw new Error("signal");
		return {
			Connect(fn) {
				connects += 1;
				handler = fn;
				return {
					Disconnect() {
						disconnects += 1;
						handler = undefined;
					},
				};
			},
		};
	},
};

const seen = [];
const stopA = observeViewport(host, (size) => seen.push(`a:${size.width}`));
const stopB = observeViewport(host, (size) => seen.push(`b:${size.width}`));
if (connects !== 1) throw new Error(`one connection ${connects}`);
if (!seen.includes("a:400") || !seen.includes("b:400")) throw new Error("sync notify");

host.AbsoluteSize = { X: 900, Y: 300 };
handler();
if (!seen.includes("a:900") || !seen.includes("b:900")) throw new Error("shared notify");

stopA();
if (disconnects !== 0) throw new Error("keep while listeners remain");
stopB();
if (disconnects !== 1) throw new Error("teardown on last");

const stopC = observeViewport(host, () => {});
if (connects !== 2) throw new Error("reconnect");
clearViewportObservers();
if (disconnects !== 2) throw new Error("clear disconnects");
stopC();

console.log("viewport observer ok");
