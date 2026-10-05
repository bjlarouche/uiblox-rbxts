import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { avatarInitials } from "./avatarText";
import useAvatarStyles from "./Avatar.styles";

export interface AvatarProps {
	name?: string;
	image?: string;
	size?: number;
}

function Avatar(props: CustomizedProps<Frame, AvatarProps>) {
	const { name = "", image, size, className, sx, id, ref } = props;
	const styles = useAvatarStyles({ size });
	return (
		<frame key={id || "Avatar"} ref={ref} {...styles.root} {...className} {...sx}>
			<uicorner {...styles.corner} />
			{image !== undefined ? (
				<imagelabel key="Image" {...styles.image} Image={image} />
			) : (
				<textlabel key="Initials" {...styles.text} Text={avatarInitials(name)} />
			)}
		</frame>
	);
}

export default Avatar;
