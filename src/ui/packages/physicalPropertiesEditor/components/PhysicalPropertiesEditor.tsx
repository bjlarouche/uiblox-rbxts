import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { NumberInput } from "ui/packages/numberInput";
import usePhysicalPropertiesEditorStyles from "./PhysicalPropertiesEditor.styles";
import { PhysicalField, patchPhysicalParts, physicalBounds, physicalCaption, physicalRows } from "./physicalParts";

export interface PhysicalPropertiesEditorProps {
	value: PhysicalProperties;
	onChange: (value: PhysicalProperties) => void;
	disabled?: boolean;
}

function PhysicalPropertiesEditor(props: CustomizedProps<Frame, PhysicalPropertiesEditorProps>) {
	const { value, onChange, disabled, className, sx, id, ref } = props;
	const styles = usePhysicalPropertiesEditorStyles();
	const amounts: { [key: string]: number } = {
		Density: value.Density,
		Friction: value.Friction,
		Elasticity: value.Elasticity,
		FrictionWeight: value.FrictionWeight,
		ElasticityWeight: value.ElasticityWeight,
	};

	const commit = (field: PhysicalField, amount: number) => {
		const parts = patchPhysicalParts(
			value.Density,
			value.Friction,
			value.Elasticity,
			value.FrictionWeight,
			value.ElasticityWeight,
			field,
			amount,
		);
		onChange(new PhysicalProperties(parts[0], parts[1], parts[2], parts[3], parts[4]));
	};

	return (
		<SxHost tag="frame" key={id || "PhysicalPropertiesEditor"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...styles.wrap} />
			<>
				{physicalRows().map((row, rowIndex) => (
					<frame key={`Row-${rowIndex}`} {...styles.row} LayoutOrder={rowIndex + 1}>
						<uilistlayout {...styles.pair} />
						<>
							{row.map((field, index) => (
								<frame key={field} {...styles.cell} LayoutOrder={index + 1}>
									<uilistlayout {...styles.stack} />
									<textlabel {...styles.label} Text={physicalCaption(field)} LayoutOrder={1} />
									<frame {...styles.field} LayoutOrder={2}>
										<NumberInput
											value={amounts[field]}
											min={physicalBounds(field).min}
											max={physicalBounds(field).max}
											step={physicalBounds(field).step}
											places={4}
											disabled={disabled}
											size="small"
											width={new UDim(1, 0)}
											onChange={(amount) => commit(field, amount)}
										/>
									</frame>
								</frame>
							))}
						</>
					</frame>
				))}
			</>
		</SxHost>
	);
}

export default PhysicalPropertiesEditor;
