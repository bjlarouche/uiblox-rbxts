import Roact from "@rbxts/roact";
import { withHooks, useEffect, useState } from "@rbxts/roact-hooked";
import { WriteableStyle } from "theme";
import useShadowStyles from "./Shadow.styles";

const Shadow = withHooks(() => {
	const { container } = useShadowStyles();
	const [parent, setParent] = useState<GuiObject | undefined>(undefined);
	const [cornerRadius, setCornerRadius] = useState<UDim | undefined>();

	const defaultZIndex = (container as WriteableStyle<Frame>).ZIndex ?? 0;
	const [zIndex, setZIndex] = useState<number>(defaultZIndex);

	// Set any inherited properties
	useEffect(() => {
		if (!parent) return;

		const cornerRadius = parent?.FindFirstChildOfClass("UICorner")?.CornerRadius;
		setCornerRadius(cornerRadius);

		setZIndex((parent?.ZIndex ?? defaultZIndex) - 1);
		parent.ClipsDescendants = false; // Shadow won't work if this is true
	}, [parent]);

	return (
		<frame
			Key="Shadow"
			{...container}
			ZIndex={zIndex}
			Event={{
				AncestryChanged: (rbx: Frame, parent: Instance) => {
					if (parent.IsA("GuiObject") && rbx.Parent === parent) {
						setParent(parent);
					}
				},
			}}
		>
			{cornerRadius !== undefined && <uicorner Key="Corner" CornerRadius={cornerRadius} />}
		</frame>
	);
});

export default Shadow;
