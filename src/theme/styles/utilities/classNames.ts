import { WriteableStyle } from "../types/WriteableStyle";

export type GenericStyle = {
	[property: string]: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConditionalStyles = Map<WriteableStyle<any>, boolean>;

const classNames = (styles: ConditionalStyles): GenericStyle => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let style = {} as WriteableStyle<any>;

	styles.forEach((value, key) => {
		if (value) {
			style = { ...style, ...key };
		}
	});

	return { ...style };
};

export default classNames;
