import { WriteableStyle, ConditionalStylesMap } from "../types";

const classNamesInternal = <T extends Instance>(
	conditionalStyles?: ConditionalStylesMap<T>,
	...styles: Array<WriteableStyle<T>>
): WriteableStyle<T> => {
	let style = {} as WriteableStyle<T>;

	styles.filterUndefined().forEach((value) => {
		if (value) {
			style = { ...style, ...value };
		}
	});

	conditionalStyles?.forEach((value, key) => {
		if (value) {
			style = { ...style, ...key };
		}
	});

	return { ...style };
};

// Use variadic tuple types to allow for multiple WriteableStyle<T> arguments with an optional ConditionalStyles<T> argument at the end
function classNames<T extends Instance>(
	...args: [...Array<WriteableStyle<T> | undefined>, ConditionalStylesMap<T>] | [...Array<WriteableStyle<T> | undefined>]
): WriteableStyle<T> {
	// Check if last argument is ConditionalStyles
	const hasConditionalStyles = (args: unknown[]): args is [...Array<WriteableStyle<T>>, ConditionalStylesMap<T>] => {
		try {
			const lastArg = args[args.size() - 1];

			// If the last argument is undefined or not a table then its not a ConditionalStyles<T>
			// Map<K, V> compiles to a table literal (ref: https://roblox-ts.com/docs/api/constructors)
			if (lastArg === undefined || !typeIs(lastArg, "table")) {
				return false;
			}

			const lastArgAsConditionalStylesMap = lastArg as ConditionalStylesMap<T>;
			let matchesMapFormat = true;

			lastArgAsConditionalStylesMap?.forEach((value, key) => {
				// Assume that the last argument is a ConditionalStyles<T> with correct format (Map<WriteableStyle<T>, boolean>)
				// If the key is not a WriteableStyle<T> then it does not match the format
				// If the value is not a boolean then it does not match the format
				if (!typeIs(value, "boolean") || !typeIs(key, "table")) {
					matchesMapFormat = false;
				}
			});

			return matchesMapFormat;
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
			return classNamesInternal(conditionalStyles, ...styles.filterUndefined());
		}
	} catch {
		// If we catch an error, like attempt to iterate over a string value, it means that the last argument is not a ConditionalStyles<T>
		const styles = args as Array<WriteableStyle<T>>;
		return classNamesInternal(undefined, ...styles.filterUndefined());
	}

	// Handle case without ConditionalStyles
	// All args are WriteableStyle<T>
	const styles = args as Array<WriteableStyle<T>>;
	return classNamesInternal(undefined, ...styles.filterUndefined());
}

export default classNames;
