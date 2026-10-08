/** An empty note stays off the header. The body still hides when the panel is shut. */
export function accordionNote(note?: string) {
	if (note === undefined || note === "") return undefined;
	return note;
}
