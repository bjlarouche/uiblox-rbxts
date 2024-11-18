import { WriteableStyle } from "../types/WriteableStyle";

export type GenericStyle = {
	[property: string]: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConditionalStyles<T extends Instance> = Map<WriteableStyle<T>, boolean>;

const classNames = <T extends Instance>(
	conditionalStyles?: ConditionalStyles<T>,
	...styles: Array<WriteableStyle<T>>
): WriteableStyle<T> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let style = {} as WriteableStyle<T>;

	conditionalStyles?.forEach((value, key) => {
		if (value) {
			style = { ...style, ...key };
		}
	});

	styles.forEach((value) => {
		if (value) {
			style = { ...style, ...value };
		}
	});
						
	return { ...style };
};

export default classNames;
