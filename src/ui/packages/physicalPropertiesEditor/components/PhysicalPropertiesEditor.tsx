import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { NumberInput } from "ui/packages/numberInput";
import usePhysicalPropertiesEditorStyles from "./PhysicalPropertiesEditor.styles";
import { PhysicalField, patchPhysicalParts, physicalFields } from "./physicalParts";

export interface PhysicalPropertiesEditorProps {
	value: PhysicalProperties;
	onChange: (value: PhysicalProperties) => void;
	disabled?: boolean;
}

function PhysicalPropertiesEditor(props: CustomizedProps<Frame, PhysicalPropertiesEditorProps>) {
	const { value, onChange, disabled, className, sx, id, ref } = props;
	const styles = usePhysicalPropertiesEditorStyles();
	const amounts = [value.Density, value.Friction, value.Elasticity, value.FrictionWeight, value.ElasticityWeight];

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
		<frame key={id || "PhysicalPropertiesEditor"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.wrap} />
			<>
			{physicalFields().map((field, index) => (
				<frame key={field} {...styles.axis} LayoutOrder={index + 1}>
					<uilistlayout {...styles.row} />
					<textlabel {...styles.label} Text={field} />
					<frame {...styles.field}>
						<NumberInput
							value={amounts[index]}
							disabled={disabled}
							width={new UDim(1, 0)}
							onChange={(amount) => commit(field, amount)}
						/>
					</frame>
				</frame>
			))}
			</>
		</frame>
	);
}

export default PhysicalPropertiesEditor;
