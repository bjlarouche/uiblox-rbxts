import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { imageListTitle } from "./imageListLayout";
import useImageListStyles from "./ImageList.styles";

export interface ImageListItem {
	src: string;
	title?: string;
}

export interface ImageListProps {
	items: ImageListItem[];
	cols?: number;
	gap?: number;
	itemSize?: number;
	onItemActivated?: (index: number) => void;
}

function ImageList(props: CustomizedProps<Frame, ImageListProps>) {
	const { items, cols, gap, itemSize, onItemActivated, className, sx, id, ref } = props;
	const styles = useImageListStyles({ cols, gap, itemSize });
	return (
		<frame key={id || "ImageList"} ref={ref} {...styles.root} {...className} {...sx}>
			<uigridlayout {...styles.grid} />
			{items.map((item, index) => {
				const title = imageListTitle(item.title);
				return (
					<imagebutton
						key={`Tile-${index}`}
						{...styles.tile}
						LayoutOrder={index}
						Event={{
							Activated: () => onItemActivated?.(index),
						}}
					>
						<uicorner {...styles.corner} />
						<imagelabel key="Image" {...styles.image} Image={item.src} />
						{title !== undefined && (
							<textlabel key="Title" {...styles.title} Text={title}>
								<uipadding {...styles.titlePad} />
							</textlabel>
						)}
					</imagebutton>
				);
			})}
		</frame>
	);
}

export default ImageList;
