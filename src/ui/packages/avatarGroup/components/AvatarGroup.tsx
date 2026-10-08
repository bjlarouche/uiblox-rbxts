import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Avatar } from "ui/packages/avatar";
import { AvatarVariant } from "ui/packages/avatar/components/Avatar.styles";
import { SxHost } from "ui/packages/host";
import { avatarGroupCut } from "./avatarGroupCut";
import useAvatarGroupStyles from "./AvatarGroup.styles";

export interface AvatarGroupEntry {
	name?: string;
	image?: string;
}

export interface AvatarGroupProps {
	items: AvatarGroupEntry[];
	max?: number;
	size?: number;
	variant?: AvatarVariant;
}

function AvatarGroup(props: CustomizedProps<Frame, AvatarGroupProps>) {
	const { items, max, size = 40, variant = "circular", className, sx, id, ref } = props;
	const styles = useAvatarGroupStyles({ size, variant });
	const count = items.size();
	const shown = avatarGroupCut(count, max);
	const extra = count - shown;
	return (
		<SxHost tag="frame" key={id || "AvatarGroup"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uilistlayout {...styles.list} />
			<>
				{items.map((entry, index) => {
					if (index >= shown) return undefined;
					return (
						<Avatar
							key={`${entry.name ?? "face"}-${index}`}
							name={entry.name}
							image={entry.image}
							size={size}
							variant={variant}
							className={{ LayoutOrder: index, ZIndex: index + 1 }}
						/>
					);
				})}
				{extra > 0 ? (
					<frame key="Extra" {...styles.surplus} LayoutOrder={shown} ZIndex={shown + 1}>
						{variant !== "square" ? <uicorner {...styles.corner} /> : undefined}
						<textlabel {...styles.surplusText} Text={`+${extra}`} />
					</frame>
				) : undefined}
			</>
		</SxHost>
	);
}

export default AvatarGroup;
