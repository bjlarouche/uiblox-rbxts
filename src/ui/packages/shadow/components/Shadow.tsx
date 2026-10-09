import React, { useEffect, useRef, useState } from "@rbxts/react";
import { CustomizedProps, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import useShadowStyles from "./Shadow.styles";

const ORIGIN = UDim2.fromOffset(0, 0);
const ZERO_ANCHOR = new Vector2(0, 0);

function Shadow(props: CustomizedProps<Frame>) {
	const { container, blob } = useShadowStyles();
	const [cornerRadius, setCornerRadius] = useState<UDim | undefined>();
	const [blobSize, setBlobSize] = useState(UDim2.fromOffset(0, 0));

	const { className, sx, id, ref } = props;
	const defaultZIndex = (container as WriteableStyle<Frame>).ZIndex ?? 0;
	const [zIndex, setZIndex] = useState<number>(defaultZIndex);

	const alive = useRef(true);
	const gen = useRef(0);
	const shadowRef = useRef<Frame>();
	const wrapRef = useRef<Frame>();
	const faceRef = useRef<GuiObject>();
	const conns = useRef<RBXScriptConnection[]>([]);

	const disconnect = () => {
		for (const conn of conns.current) conn.Disconnect();
		conns.current = [];
	};

	const follow = (face: GuiObject) => {
		const wrap = wrapRef.current;
		if (!wrap || face.Parent !== wrap) return;
		if (face.Position !== ORIGIN) {
			wrap.Position = face.Position;
			face.Position = ORIGIN;
		}
		if (face.AnchorPoint !== ZERO_ANCHOR) {
			wrap.AnchorPoint = face.AnchorPoint;
			face.AnchorPoint = ZERO_ANCHOR;
		}
		wrap.Size = face.Size;
		wrap.AutomaticSize = face.AutomaticSize;
		wrap.LayoutOrder = face.LayoutOrder;
		wrap.ZIndex = face.ZIndex;
		wrap.Visible = face.Visible;
		const size = UDim2.fromOffset(face.AbsoluteSize.X, face.AbsoluteSize.Y);
		setBlobSize((prev) => (prev.X.Offset === size.X.Offset && prev.Y.Offset === size.Y.Offset ? prev : size));
		const radius = face.FindFirstChildOfClass("UICorner")?.CornerRadius;
		setCornerRadius((prev) => {
			if (radius === undefined) return prev === undefined ? prev : undefined;
			if (prev !== undefined && prev.Offset === radius.Offset && prev.Scale === radius.Scale) return prev;
			return radius;
		});
		setZIndex(face.ZIndex - 1);
	};

	const bind = (face: GuiObject) => {
		disconnect();
		const sync = () => follow(face);
		sync();
		const watch = [
			"AbsoluteSize",
			"Size",
			"AutomaticSize",
			"Position",
			"AnchorPoint",
			"LayoutOrder",
			"ZIndex",
			"Visible",
		] as const;
		conns.current = watch.map((name) => face.GetPropertyChangedSignal(name).Connect(sync));
		conns.current.push(
			face.AncestryChanged.Connect(() => {
				const shadow = shadowRef.current;
				if (shadow) schedule(shadow);
			}),
		);
	};

	const lift = (shadow: Frame) => {
		if (!alive.current) return;
		const parent = shadow.Parent;
		if (!parent || !parent.IsA("GuiObject")) return;
		const existing = wrapRef.current;
		if (existing && parent === existing) {
			const face = faceRef.current;
			if (!face || face.Parent === existing) return;
			if (face.Position !== ORIGIN) {
				existing.Position = face.Position;
				face.Position = ORIGIN;
			}
			if (face.AnchorPoint !== ZERO_ANCHOR) {
				existing.AnchorPoint = face.AnchorPoint;
				face.AnchorPoint = ZERO_ANCHOR;
			}
			shadow.Parent = existing;
			face.Parent = existing;
			return;
		}

		const face = parent;
		const wrapped = existing !== undefined && face.Parent === existing;
		const holder = wrapped ? existing.Parent : face.Parent;
		if (!holder) return;

		disconnect();
		const wrap = existing ?? new Instance("Frame");
		if (existing === undefined) {
			wrap.Name = "ShadowWrap";
			wrap.BackgroundTransparency = 1;
			wrap.BorderSizePixel = 0;
			wrap.ClipsDescendants = false;
			wrapRef.current = wrap;
		}
		wrap.Size = face.Size;
		wrap.AutomaticSize = face.AutomaticSize;
		wrap.LayoutOrder = face.LayoutOrder;
		wrap.ZIndex = face.ZIndex;
		wrap.Visible = face.Visible;
		if (!wrapped) {
			wrap.Position = face.Position;
			wrap.AnchorPoint = face.AnchorPoint;
			// Shadow first, surface next, so the face paints over the blob.
			shadow.Parent = wrap;
			face.Parent = wrap;
			face.Position = ORIGIN;
			face.AnchorPoint = ZERO_ANCHOR;
			wrap.Parent = holder;
		} else {
			shadow.Parent = wrap;
		}
		faceRef.current = face;
		bind(face);
	};

	const schedule = (shadow: Frame) => {
		if (!alive.current) return;
		const wrap = wrapRef.current;
		const face = faceRef.current;
		if (wrap && shadow.Parent === wrap && face && face.Parent === wrap) return;
		const token = ++gen.current;
		task.defer(() => {
			if (!alive.current || gen.current !== token) return;
			lift(shadow);
		});
	};

	useEffect(() => {
		const shadow = shadowRef.current;
		if (shadow) schedule(shadow);
		return () => {
			alive.current = false;
			gen.current++;
			disconnect();
			const wrap = wrapRef.current;
			const face = faceRef.current;
			const host = shadowRef.current;
			wrapRef.current = undefined;
			if (wrap && face && face.Parent === wrap) {
				face.Position = wrap.Position;
				face.AnchorPoint = wrap.AnchorPoint;
				if (host && host.Parent === wrap) host.Parent = face;
				face.Parent = wrap.Parent;
			}
			wrap?.Destroy();
		};
	}, []);

	return (
		<SxHost
			tag="frame"
			key={id || "Shadow"}
			hostRef={(instance: Frame | undefined) => {
				shadowRef.current = instance;
				if (typeIs(ref, "function")) {
					ref(instance);
					return;
				}
				if (ref !== undefined) (ref as { current?: Frame }).current = instance;
			}}
			base={container}
			className={className}
			sx={sx}
			ZIndex={zIndex}
			Event={{
				AncestryChanged: (rbx: Frame, parent: Instance) => {
					if (parent.IsA("GuiObject") && rbx.Parent === parent) schedule(rbx);
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
