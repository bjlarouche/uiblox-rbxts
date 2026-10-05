export interface ColorStop {
	t: number;
	color: Color3;
}

export interface NumberStop {
	t: number;
	value: number;
	envelope: number;
}

function lerp(a: number, b: number, alpha: number) {
	return a + (b - a) * alpha;
}

export function lerpColor(a: Color3, b: Color3, alpha: number) {
	return new Color3(lerp(a.R, b.R, alpha), lerp(a.G, b.G, alpha), lerp(a.B, b.B, alpha));
}

function insertOrdered<T extends defined>(list: T[], item: T, before: (item: T, existing: T) => boolean) {
	let at = list.size();
	for (let index = 0; index < list.size(); index++) {
		if (before(item, list[index])) {
			at = index;
			break;
		}
	}
	list.insert(at, item);
	return list;
}

function sortColor(stops: ColorStop[]) {
	const copy = new Array<ColorStop>();
	for (const stop of stops) insertOrdered(copy, stop, (item, existing) => item.t < existing.t);
	return copy;
}

function sortNumber(stops: NumberStop[]) {
	const copy = new Array<NumberStop>();
	for (const stop of stops) insertOrdered(copy, stop, (item, existing) => item.t < existing.t);
	return copy;
}

export function readColorStops(sequence: ColorSequence): ColorStop[] {
	const stops: ColorStop[] = [];
	for (const key of sequence.Keypoints) stops.push({ t: key.Time, color: key.Value });
	return sortColor(stops);
}

export function writeColorStops(stops: ColorStop[]) {
	const ordered = sortColor(stops);
	const keys = ordered.map((stop) => new ColorSequenceKeypoint(stop.t, stop.color));
	return new ColorSequence(keys);
}

export function sampleColor(stops: ColorStop[], time: number) {
	const ordered = sortColor(stops);
	if (ordered.size() === 0) return new Color3();
	const t = math.clamp(time, 0, 1);
	if (t <= ordered[0].t) return ordered[0].color;
	for (let index = 1; index < ordered.size(); index++) {
		const left = ordered[index - 1];
		const right = ordered[index];
		if (t <= right.t) {
			const span = right.t - left.t;
			return lerpColor(left.color, right.color, span === 0 ? 0 : (t - left.t) / span);
		}
	}
	return ordered[ordered.size() - 1].color;
}

export function insertColorStop(stops: ColorStop[], time: number) {
	const t = math.clamp(time, 0, 1);
	const updated = new Array<ColorStop>();
	for (const stop of stops) updated.push(stop);
	updated.push({ t, color: sampleColor(stops, t) });
	return sortColor(updated);
}

export function patchColorStop(stops: ColorStop[], index: number, patch: Partial<ColorStop>) {
	const updated: ColorStop[] = [];
	for (let i = 0; i < stops.size(); i++) {
		const stop = stops[i];
		if (i !== index) {
			updated.push(stop);
			continue;
		}
		const pinned = i === 0 ? 0 : i === stops.size() - 1 ? 1 : math.clamp(patch.t ?? stop.t, 0, 1);
		updated.push({ t: pinned, color: patch.color ?? stop.color });
	}
	return sortColor(updated);
}

export function removeColorStop(stops: ColorStop[], index: number) {
	if (stops.size() <= 2) return stops;
	if (index <= 0 || index >= stops.size() - 1) return stops;
	const updated: ColorStop[] = [];
	for (let i = 0; i < stops.size(); i++) {
		if (i !== index) updated.push(stops[i]);
	}
	return updated;
}

export function readNumberStops(sequence: NumberSequence): NumberStop[] {
	const stops: NumberStop[] = [];
	for (const key of sequence.Keypoints) stops.push({ t: key.Time, value: key.Value, envelope: key.Envelope });
	return sortNumber(stops);
}

export function writeNumberStops(stops: NumberStop[]) {
	const ordered = sortNumber(stops);
	const keys = ordered.map((stop) => new NumberSequenceKeypoint(stop.t, stop.value, stop.envelope));
	return new NumberSequence(keys);
}

export function sampleNumber(stops: NumberStop[], time: number) {
	const ordered = sortNumber(stops);
	if (ordered.size() === 0) return { value: 0, envelope: 0 };
	const t = math.clamp(time, 0, 1);
	if (t <= ordered[0].t) return { value: ordered[0].value, envelope: ordered[0].envelope };
	for (let index = 1; index < ordered.size(); index++) {
		const left = ordered[index - 1];
		const right = ordered[index];
		if (t <= right.t) {
			const span = right.t - left.t;
			const alpha = span === 0 ? 0 : (t - left.t) / span;
			return {
				value: lerp(left.value, right.value, alpha),
				envelope: lerp(left.envelope, right.envelope, alpha),
			};
		}
	}
	const last = ordered[ordered.size() - 1];
	return { value: last.value, envelope: last.envelope };
}

export function insertNumberStop(stops: NumberStop[], time: number) {
	const t = math.clamp(time, 0, 1);
	const sampled = sampleNumber(stops, t);
	const updated = new Array<NumberStop>();
	for (const stop of stops) updated.push(stop);
	updated.push({ t, value: sampled.value, envelope: sampled.envelope });
	return sortNumber(updated);
}

export function patchNumberStop(stops: NumberStop[], index: number, patch: Partial<NumberStop>) {
	const updated: NumberStop[] = [];
	for (let i = 0; i < stops.size(); i++) {
		const stop = stops[i];
		if (i !== index) {
			updated.push(stop);
			continue;
		}
		const pinned = i === 0 ? 0 : i === stops.size() - 1 ? 1 : math.clamp(patch.t ?? stop.t, 0, 1);
		updated.push({
			t: pinned,
			value: patch.value ?? stop.value,
			envelope: patch.envelope ?? stop.envelope,
		});
	}
	return sortNumber(updated);
}

export function removeNumberStop(stops: NumberStop[], index: number) {
	if (stops.size() <= 2) return stops;
	if (index <= 0 || index >= stops.size() - 1) return stops;
	const updated: NumberStop[] = [];
	for (let i = 0; i < stops.size(); i++) {
		if (i !== index) updated.push(stops[i]);
	}
	return updated;
}

export function hitStop(times: number[], alpha: number, threshold: number) {
	let best = -1;
	let distance = threshold;
	for (let index = 0; index < times.size(); index++) {
		const gap = math.abs(times[index] - alpha);
		if (gap <= distance) {
			best = index;
			distance = gap;
		}
	}
	return best;
}
