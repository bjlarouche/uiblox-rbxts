import React from "@rbxts/react";
import { Glyph, glyphParts, glyphStroke } from "./glyphs";

const GRID = 24;
const PILL = new UDim(1, 0);
const CENTER = new Vector2(0.5, 0.5);

interface DrawnGlyphProps {
	name: Glyph;
	size: number;
	color: Color3;
	transparency?: number;
	zIndex?: number;
}

/** Fills its parent. Parts are placed by scale so only the stroke weight depends on `size`. */
export function DrawnGlyph(props: DrawnGlyphProps) {
	const { name, size, color, transparency = 0, zIndex } = props;
	const t = glyphStroke(size);
	return (
		<>
			{glyphParts(name).map((part, index) => {
				const key = `g${index}`;
				if (part.kind === "bar") {
					const dx = part.x2 - part.x1;
					const dy = part.y2 - part.y1;
					return (
						<frame
							key={key}
							AnchorPoint={CENTER}
							Position={UDim2.fromScale((part.x1 + part.x2) / 2 / GRID, (part.y1 + part.y2) / 2 / GRID)}
							Size={new UDim2(math.sqrt(dx * dx + dy * dy) / GRID, t, 0, t)}
							Rotation={math.deg(math.atan2(dy, dx))}
							BackgroundColor3={color}
							BackgroundTransparency={transparency}
							BorderSizePixel={0}
							ZIndex={zIndex}
						>
							<uicorner CornerRadius={PILL} />
						</frame>
					);
				}
				if (part.kind === "dot") {
					return (
						<frame
							key={key}
							AnchorPoint={CENTER}
							Position={UDim2.fromScale(part.x / GRID, part.y / GRID)}
							Size={UDim2.fromScale(part.d / GRID, part.d / GRID)}
							SizeConstraint={Enum.SizeConstraint.RelativeXX}
							BackgroundColor3={color}
							BackgroundTransparency={transparency}
							BorderSizePixel={0}
							ZIndex={zIndex}
						>
							<uicorner CornerRadius={PILL} />
						</frame>
					);
				}
				const ringed = part.kind === "ring";
				const w = ringed ? part.d : part.w;
				const h = ringed ? part.d : part.h;
				const x = ringed ? part.x - part.d / 2 : part.x;
				const y = ringed ? part.y - part.d / 2 : part.y;
				return (
					<frame
						key={key}
						Position={new UDim2(x / GRID, t, y / GRID, t)}
						Size={new UDim2(w / GRID, -t * 2, h / GRID, -t * 2)}
						BackgroundTransparency={1}
						BorderSizePixel={0}
						ZIndex={zIndex}
					>
						<uicorner CornerRadius={ringed ? PILL : new UDim(0, t)} />
						<uistroke Color={color} Thickness={t} Transparency={transparency} />
					</frame>
				);
			})}
		</>
	);
}
