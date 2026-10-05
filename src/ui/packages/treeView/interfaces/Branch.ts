import type { Icons } from "ui/enums";
import Leaf from "./Leaf";

export default interface Branch {
	title: string;
	leaves: Leaf[];
	branches?: Branch[];
	onClick?: () => void;
	icon?: Icons;
}
