/// <reference types="@rbxts/types" />
import { Tokens } from "../../..";
export type ColorTokens = {
    [key in Tokens]: Color3;
};
