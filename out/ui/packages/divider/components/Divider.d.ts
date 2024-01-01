/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/types" />
/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { CustomizedProps } from "../../../../theme";
import { Orientations } from "../../../enums";
type DefaultDividerComponent = Frame;
export interface DividerProps {
    position?: UDim2;
    orientation?: Orientations;
    padding?: number;
    color?: Color3;
    transparency?: number;
    weight?: number;
}
declare function Divider<T extends DefaultDividerComponent>(props: CustomizedProps<T, DividerProps>): Roact.Element;
export default Divider;
