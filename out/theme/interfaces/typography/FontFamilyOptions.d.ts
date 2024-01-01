/// <reference types="@rbxts/compiler-types" />
/// <reference types="@rbxts/types" />
export type FontFamilyVariant = "default" | "bold" | "semibold" | "light" | "italics";
export interface FontFamilyOptions extends Partial<Record<FontFamilyVariant, Required<Enum.Font>>> {
}
