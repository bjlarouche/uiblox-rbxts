import { WriteableStyle, ConditionalStylesMap } from "../types";

const classNamesInternal = <T extends Instance>(
	conditionalStyles?: ConditionalStylesMap<T>,
	...styles: Array<WriteableStyle<T>>
): WriteableStyle<T> => {
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

// Use variadic tuple types to allow for multiple WriteableStyle<T> arguments with an optional ConditionalStyles<T> argument at the end
function classNames<T extends Instance>(
	...args: [...Array<WriteableStyle<T>>, ConditionalStylesMap<T>] | [...Array<WriteableStyle<T>>]
): WriteableStyle<T> {
	// Check if last argument is ConditionalStyles
	const hasConditionalStyles = (args: unknown[]): args is [...Array<WriteableStyle<T>>, ConditionalStylesMap<T>] => {
		try {
			const lastArg = args[args.size() - 1];

			return lastArg !== undefined && typeIs(lastArg, "table");
		} catch {
			// If we catch an error, it means that the last argument is not a ConditionalStyles<T>
			return false;
		}
	};

	try {
		if (hasConditionalStyles(args)) {
		// Handle case with ConditionalStyles
		const conditionalStyles = args.pop() as ConditionalStylesMap<T>;
		const styles = args as Array<WriteableStyle<T>>;

		// ConditionalStyles<T> is the last argument
		return classNamesInternal(conditionalStyles, ...styles);
	}
	} catch  {
		// If we catch an error, like attempt to iterate over a string value, it means that the last argument is not a ConditionalStyles<T>
		const styles = args as Array<WriteableStyle<T>>;
		return classNamesInternal(undefined, ...styles);
	}

	// Handle case without ConditionalStyles
	// All args are WriteableStyle<T>
	const styles = args as Array<WriteableStyle<T>>;
	return classNamesInternal(undefined, ...styles);
}

export default classNames;
