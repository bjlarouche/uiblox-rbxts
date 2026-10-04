import type { WriteableStyle } from "../types";

const classNames = <T extends Instance>(
	...args: Array<WriteableStyle<T> | false | undefined>
): WriteableStyle<T> => {
	let style = {} as WriteableStyle<T>;

	for (const arg of args) {
		if (arg !== false && arg !== undefined) {
			style = { ...style, ...arg };
		}
	}

	return style;
};

export default classNames;
export { classNames as cx };
