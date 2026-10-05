export function portalTarget(host?: Instance): LayerCollector | undefined {
	if (!host) return undefined;
	if (host.IsA("LayerCollector")) return host;
	return host.FindFirstAncestorWhichIsA("LayerCollector");
}
