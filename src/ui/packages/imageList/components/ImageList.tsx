import React from "@rbxts/react";
import { TextService } from "@rbxts/services";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { imageListCell, imageListItemAspect, imageListSelected, imageListTitle, imageListTitleWrap } from "./imageListLayout";
import useImageListStyles from "./ImageList.styles";

export interface ImageListItem {
	src: string;
	title?: string;
	color?: Color3;
	aspect?: number;
}

export interface ImageListProps {
	items: ImageListItem[];
	cols?: number;
	gap?: number;
	itemSize?: number;
	aspect?: number;
	selected?: ReadonlyArray<number>;
	onItemActivated?: (index: number) => void;
}

function ImageList(props: CustomizedProps<Frame, ImageListProps>) {
	const { items, cols, gap, itemSize, aspect, selected, onItemActivated, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const styles = useImageListStyles({ cols, gap, itemSize, aspect });
	const font = theme.typography.fontFamilies.default ?? Enum.Font.SourceSans;
	const textSize = theme.typography.fontSizes.caption ?? 12;
	const pad = theme.spacing.calc(0.5) * 2;
	const bar = theme.spacing.calc(2.5);
	return (
		<SxHost tag="frame" key={id || "ImageList"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uilistlayout {...styles.flow} />
			<>
				{items.map((item, index) => {
					const title = imageListTitle(item.title);
					const picked = imageListSelected(selected, index);
					const cell = imageListCell(itemSize, imageListItemAspect(item.aspect, aspect));
					const textWidth = title !== undefined ? TextService.GetTextSize(title, textSize, font, new Vector2(10000, 100)).X : 0;
					const wrap = title !== undefined && imageListTitleWrap(textWidth, cell.width - pad);
					return (
						<imagebutton
							key={`Tile-${index}`}
							{...styles.tile}
							Size={UDim2.fromOffset(cell.width, cell.height)}
							{...(item.color !== undefined ? { BackgroundColor3: item.color } : {})}
							LayoutOrder={index}
							Event={{
								Activated: () => onItemActivated?.(index),
							}}
						>
							<uicorner {...styles.corner} />
							{picked && <uistroke {...styles.selected} />}
							<imagelabel key="Image" {...styles.image} Image={item.src} />
							{title !== undefined && (
								<textlabel
									key="Title"
									{...styles.title}
									Text={title}
									{...(wrap
										? {
												AnchorPoint: new Vector2(0, 1),
												Position: new UDim2(0, 0, 1, 0),
												Size: new UDim2(1, 0, 0, bar),
												AutomaticSize: Enum.AutomaticSize.Y,
												TextWrapped: true,
												TextTruncate: Enum.TextTruncate.None,
											}
										: {})}
								>
									<uipadding {...styles.titlePad} />
								</textlabel>
							)}
						</imagebutton>
					);
				})}
			</>
		</SxHost>
	);
}

export default ImageList;
