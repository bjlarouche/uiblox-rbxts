import React, { useEffect, useState } from "@rbxts/react";
import { CustomizedProps, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import useShadowStyles from "./Shadow.styles";

function Shadow(props: CustomizedProps<Frame>) {
	const { container, blob } = useShadowStyles();
	const [parent, setParent] = useState<GuiObject | undefined>(undefined);
	const [cornerRadius, setCornerRadius] = useState<UDim | undefined>();
	const [blobSize, setBlobSize] = useState(UDim2.fromOffset(0, 0));

	const { className, sx, id, ref } = props;
	const defaultZIndex = (container as WriteableStyle<Frame>).ZIndex ?? 0;
	const [zIndex, setZIndex] = useState<number>(defaultZIndex);

	useEffect(() => {
		if (!parent) return;

		const cornerRadius = parent.FindFirstChildOfClass("UICorner")?.CornerRadius;
		setCornerRadius(cornerRadius);
		setZIndex((parent.ZIndex ?? defaultZIndex) - 1);
		parent.ClipsDescendants = false;

		const sync = () => {
			setBlobSize(UDim2.fromOffset(parent.AbsoluteSize.X, parent.AbsoluteSize.Y));
		};
		sync();
		const conn = parent.GetPropertyChangedSignal("AbsoluteSize").Connect(sync);
		return () => conn.Disconnect();
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
			{/* AutomaticSize does not measure scrolling-frame descendants. */}
			<scrollingframe
				key="Bounds"
				Size={UDim2.fromOffset(0, 0)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ScrollBarThickness={0}
				ScrollingEnabled={false}
				AutomaticCanvasSize={Enum.AutomaticSize.None}
				CanvasSize={UDim2.fromOffset(0, 0)}
				ClipsDescendants={false}
				Active={false}
				Selectable={false}
			>
				<frame key="Blob" {...blob} Size={blobSize} ZIndex={zIndex}>
					{cornerRadius !== undefined && <uicorner key="Corner" CornerRadius={cornerRadius} />}
				</frame>
			</scrollingframe>
		</SxHost>
	);
}

export default Shadow;
