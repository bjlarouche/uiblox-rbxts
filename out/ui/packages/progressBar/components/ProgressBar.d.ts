/// <reference types="@rbxts/types" />
/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { WriteableStyle } from "../../../../theme";
export interface ProgressBarProps {
    progress: number;
    className?: WriteableStyle<Frame>;
}
declare function ProgressBar({ progress, className }: ProgressBarProps): Roact.Element;
declare const _default: typeof ProgressBar;
export default _default;
