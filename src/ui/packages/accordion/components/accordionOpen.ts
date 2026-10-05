export function accordionOpen(expanded: boolean | undefined, controlled: boolean | undefined) {
	if (controlled !== undefined) return controlled;
	return expanded === true;
}

export function accordionGlyph(open?: boolean) {
	return open === true ? "expanded" : "collapsed";
}
