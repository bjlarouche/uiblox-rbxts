export type FontFamilyVariant = "default" | "bold" | "semibold" | "light" | "italics";

export interface FontFamilyOptions extends Partial<Record<FontFamilyVariant, Required<Enum.Font>>> {}
