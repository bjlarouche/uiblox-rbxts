import { WriteableStyle } from "../types/WriteableStyle";

export type GenericStyle = {
	[property: string]: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConditionalStyles<T extends Instance> = Map<WriteableStyle<T>, boolean>;

const classNames = <T extends Instance>(
	...styles: Array<WriteableStyle<T>>,
	conditionalStyles: ConditionalStyles<T>
): WriteableStyle<T> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let style = {} as WriteableStyle<any>;

	styles.forEach((value, key) => {
		
	});
						
	return { ...style };
};

export default classNames;
