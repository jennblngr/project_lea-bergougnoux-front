export function buildURLWithAPIAddress(url: string): string | void {
	if (!url) {
		return;
	}

	return process.env.API_URL + url;
}
