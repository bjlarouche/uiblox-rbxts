type Size = { width: number; height: number };
type Listener = (size: Size) => void;

interface HostEntry {
	listeners: Listener[];
	connection?: RBXScriptConnection;
	size: Size;
}

const hosts = new Map<GuiObject, HostEntry>();

/** One AbsoluteSize connection per host; shared by all subscribers. */
export function observeViewport(host: GuiObject, listener: Listener): () => void {
	let entry = hosts.get(host);
	if (entry === undefined) {
		entry = {
			listeners: [],
			size: { width: host.AbsoluteSize.X, height: host.AbsoluteSize.Y },
		};
		hosts.set(host, entry);
		const read = () => {
			const current = hosts.get(host);
			if (current === undefined) return;
			current.size = { width: host.AbsoluteSize.X, height: host.AbsoluteSize.Y };
			for (const next of current.listeners) next(current.size);
		};
		read();
		entry.connection = host.GetPropertyChangedSignal("AbsoluteSize").Connect(read);
	}

	entry.listeners.push(listener);
	listener(entry.size);

	return () => {
		const current = hosts.get(host);
		if (current === undefined) return;
		const index = current.listeners.indexOf(listener);
		if (index >= 0) current.listeners.remove(index);
		if (current.listeners.size() === 0) {
			current.connection?.Disconnect();
			hosts.delete(host);
		}
	};
}

/** Test helper — drop all host observers. */
export function clearViewportObservers() {
	for (const [, entry] of hosts) {
		entry.connection?.Disconnect();
		entry.listeners.clear();
	}
	hosts.clear();
}
