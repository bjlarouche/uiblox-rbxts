import Roact, { FunctionComponent } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";
import { Icons } from "ui/enums";
import { CustomizedProps, WriteableStyle } from "theme";
import useIconStyles from "./Icon.styles";

export interface IconProps {
	icon: Icons;
	size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
	tint?: Color3;
}

type DefaultIconComponent = ImageLabel;

const Icon: FunctionComponent<CustomizedProps<DefaultIconComponent, IconProps>> = (props) => {
	const { icon, tint, className } = props;
	const { container } = useIconStyles(props);

	return (
		<imagelabel
			Key="Icon"
			{...container}
			{...className}
			Image={tostring(icon)}
			ImageColor3={tint ?? (container as WriteableStyle<ImageLabel>).ImageColor3}
		/>
	);
};

export default markPureComponent(Icon);
