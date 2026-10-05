const { menuHold, SELECT_MENU_SECONDS } = await import("../src/ui/packages/select/components/selectMotion.ts");

if (menuHold(true) !== 0) throw new Error("open");
if (menuHold(false, true) !== 0) throw new Error("reduced");
if (menuHold(false) !== SELECT_MENU_SECONDS) throw new Error("close");

console.log("select motion ok");
