import type { Icons } from "../../../enums";
import Leaf from "./Leaf";

export default interface Branch {
	title: string;
	leaves: Leaf[];
	branches?: Branch[];
	onClick?: () => void;
	icon?: Icons;
}
