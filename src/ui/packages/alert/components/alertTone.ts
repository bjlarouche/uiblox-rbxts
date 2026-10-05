export type AlertSeverity = "info" | "success" | "warning" | "error";

export function alertSeverity(severity?: AlertSeverity): AlertSeverity {
	return severity ?? "info";
}
