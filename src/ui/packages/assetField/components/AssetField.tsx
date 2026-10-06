import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { Input } from "ui/packages/input";
import useAssetFieldStyles from "./AssetField.styles";
import { assetPreviewUri } from "./assetPreviewUri";

export interface AssetFieldProps {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
	placeholder?: string;
	preview?: boolean;
}

function AssetField(props: CustomizedProps<Frame, AssetFieldProps>) {
	const { value, onChange, disabled, placeholder = "rbxassetid://…", preview = true, className, sx, id, ref } = props;
	const styles = useAssetFieldStyles();
	const uri = preview === true ? assetPreviewUri(value) : undefined;

	return (
		<SxHost tag="frame" key={id || "AssetField"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...styles.list} />
			<Input
				text={value}
				disabled={disabled}
				placeholder={placeholder}
				width={new UDim(1, 0)}
				onInput={onChange}
			/>
			{uri !== undefined && (
				<imagelabel key="Preview" {...styles.preview} Image={uri} LayoutOrder={2}>
					<uicorner {...styles.corner} />
				</imagelabel>
			)}
		</SxHost>
	);
}

export default AssetField;
