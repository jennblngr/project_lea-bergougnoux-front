export function buildURLWithAPIAddress(url: string): string | void {
	if (!url) {
		return;
	}

	return process.env.VITE_API_URL + url;
}
