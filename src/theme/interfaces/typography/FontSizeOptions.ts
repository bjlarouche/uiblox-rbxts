export type FontSizeVariant =
	| "display"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "subtitle1"
	| "subtitle2"
	| "body"
	| "bodySmall"
	| "caption"
	| "button"
	| "overline";

export interface FontSizeOptions extends Partial<Record<FontSizeVariant, Required<number>>> {}
