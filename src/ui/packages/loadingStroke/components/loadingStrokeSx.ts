import { WriteableStyle } from "theme";

export type LoadingStrokeStyle = WriteableStyle<UIStroke> & {
	BackgroundColor3?: never;
	BackgroundTransparency?: never;
	Size?: never;
	Position?: never;
	AnchorPoint?: never;
	BorderSizePixel?: never;
	Text?: never;
	TextColor3?: never;
};

type Assert<T extends true> = T;
type _LoadingStrokeRejectsGuiSx = Assert<{ BackgroundColor3: Color3 } extends LoadingStrokeStyle ? never : true>;
