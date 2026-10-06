import React, { useEffect, useState } from "@rbxts/react";
import { CustomizedProps, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import useShadowStyles from "./Shadow.styles";

function Shadow(props: CustomizedProps<Frame>) {
	const { container } = useShadowStyles();
	const [parent, setParent] = useState<GuiObject | undefined>(undefined);
	const [cornerRadius, setCornerRadius] = useState<UDim | undefined>();

	const { className, sx, id, ref } = props;
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
		<SxHost
			tag="frame"
			key={id || "Shadow"}
			hostRef={ref}
			base={container}
			className={className}
			sx={sx}
			ZIndex={zIndex}
			Event={{
				AncestryChanged: (rbx: Frame, parent: Instance) => {
					if (parent.IsA("GuiObject") && rbx.Parent === parent) {
						setParent(parent);
					}
				},
			}}
		>
			{cornerRadius !== undefined && <uicorner key="Corner" CornerRadius={cornerRadius} />}
		</SxHost>
	);
}

export default Shadow;
