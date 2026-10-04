import type { Icons } from "../../../enums";

export default interface Leaf {
	title: string;
	onClick?: () => void;
	icon?: Icons;
}
