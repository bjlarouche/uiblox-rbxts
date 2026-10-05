import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { avatarInitials } from "./avatarText";
import useAvatarStyles, { AvatarVariant } from "./Avatar.styles";

export interface AvatarProps {
	name?: string;
	image?: string;
	size?: number;
	variant?: AvatarVariant;
}

function Avatar(props: CustomizedProps<Frame, AvatarProps>) {
	const { name = "", image, size, variant = "circular", className, sx, id, ref } = props;
	const styles = useAvatarStyles({ size, variant });
	return (
		<frame key={id || "Avatar"} ref={ref} {...styles.root} {...className} {...sx}>
			{variant !== "square" && <uicorner {...styles.corner} />}
			{image !== undefined ? (
				<imagelabel key="Image" {...styles.image} Image={image} />
			) : (
				<textlabel key="Initials" {...styles.text} Text={avatarInitials(name)} />
			)}
		</frame>
	);
}

export default Avatar;
