const Color3FromHex = (hex: string) => {
	const [hextStr, _] = hex.gsub("#", "");
	const bigint = tonumber(hextStr, 16);
	assert(bigint, "Color3FromHex: Invalid hex value");

	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	return Color3.fromRGB(r, g, b);
};

export default Color3FromHex;
