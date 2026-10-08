import React, { useEffect, useRef, useState } from "@rbxts/react";
import { CustomizedProps, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import useShadowStyles from "./Shadow.styles";

function Shadow(props: CustomizedProps<Frame>) {
	const { container, blob } = useShadowStyles();
	const [parent, setParent] = useState<GuiObject | undefined>(undefined);
	const [cornerRadius, setCornerRadius] = useState<UDim | undefined>();
	const [blobSize, setBlobSize] = useState(UDim2.fromOffset(0, 0));
	const blobRef = useRef<Frame>();

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
			const blob = blobRef.current;
			const auto = parent.AutomaticSize;
			let size = parent.AbsoluteSize;
			if (blob && auto !== Enum.AutomaticSize.None) {
				let extent = blob.AbsolutePosition;
				for (const child of parent.GetChildren()) {
					if (child !== blob.Parent && child.IsA("GuiObject")) {
						extent = extent.Max(child.AbsolutePosition.add(child.AbsoluteSize));
					}
				}
				const room = extent.sub(blob.AbsolutePosition);
				size = new Vector2(
					auto === Enum.AutomaticSize.Y ? size.X : room.X,
					auto === Enum.AutomaticSize.X ? size.Y : room.Y,
				);
			}
			setBlobSize(UDim2.fromOffset(size.X, size.Y));
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
			<frame key="Blob" ref={blobRef} {...blob} Size={blobSize} ZIndex={zIndex}>
				{cornerRadius !== undefined && <uicorner key="Corner" CornerRadius={cornerRadius} />}
			</frame>
		</SxHost>
	);
}

export default Shadow;
