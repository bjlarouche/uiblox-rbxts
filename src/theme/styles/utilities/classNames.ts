import { func } from "@rbxts/react/src/prop-types";
import { WriteableStyle } from "../types/WriteableStyle";

export type GenericStyle = {
	[property: string]: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConditionalStyles<T extends Instance> = Map<WriteableStyle<T>, boolean>;

const classNamesInternal = <T extends Instance>(
	conditionalStyles?: ConditionalStyles<T>,
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
function classNames<T extends Instance>(...args: [...Array<WriteableStyle<T>>, ConditionalStyles<T>] | [...Array<WriteableStyle<T>>]): WriteableStyle<T> {
	// Check if last argument is ConditionalStyles
    const hasConditionalStyles = (args: unknown[]): args is [...Array<WriteableStyle<T>>, ConditionalStyles<T>] => {
		const lastArg = args[args.size() - 1];
		
		if (lastArg === undefined) {
			return false;
		}

        return typeIs(lastArg, "table");
    };

    if (hasConditionalStyles(args)) {
        // Handle case with ConditionalStyles
        const conditionalStyles = args.pop() as ConditionalStyles<T>;
        const styles = args as Array<WriteableStyle<T>>;
		
		// ConditionalStyles<T> is the last argument
		return classNamesInternal(conditionalStyles, ...styles);
	}
	
		// Handle case without ConditionalStyles
	// All args are WriteableStyle<T>
	const styles = args as Array<WriteableStyle<T>>;
	return classNamesInternal(undefined, ...styles);
}

export default classNames;