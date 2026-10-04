import { WriteableStyle } from "../types";

const classNames = <T extends Instance>(
	...args: Array<WriteableStyle<T> | false | undefined>
): WriteableStyle<T> => {
	let style = {} as WriteableStyle<T>;

	for (let i = 0; i < args.size(); i++) {
		const arg = args[i];
		if (arg !== false && arg !== undefined) {
			style = { ...style, ...arg };
		}
	}

	return style;
};

export default classNames;
export { classNames as cx };
