import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { avatarInitials } from "./avatarText";
import { SxHost } from "ui/packages/host";
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
		<SxHost tag="frame" key={id || "Avatar"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			{variant !== "square" && <uicorner {...styles.corner} />}
			{image !== undefined ? (
				<imagelabel key="Image" {...styles.image} Image={image}>
					{variant !== "square" && <uicorner {...styles.corner} />}
				</imagelabel>
			) : (
				<textlabel key="Initials" {...styles.text} Text={avatarInitials(name)} />
			)}
		</SxHost>
	);
}

export default Avatar;
