import type { Icons } from "ui/enums";

export default interface Leaf {
	title: string;
	onClick?: () => void;
	icon?: Icons;
}
