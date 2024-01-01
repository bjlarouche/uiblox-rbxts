import Leaf from "./Leaf";
export default interface Branch {
    title: string;
    leaves: Leaf[];
    onClick?: () => void;
}
