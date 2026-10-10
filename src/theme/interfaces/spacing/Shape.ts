export default interface Shape {
	/** Pixel radius for squared controls (Button, Input, Paper). */
	borderRadius: number;
	/** UICorner scale for capsules (Switch, Chip). Use `new UDim(pillScale, 0)`. */
	pillScale: number;
	/** Pixel radii: tight internals, controls and surfaces, dialogs and cards. `default` matches `borderRadius`. */
	radius: { small: number; default: number; large: number };
}
