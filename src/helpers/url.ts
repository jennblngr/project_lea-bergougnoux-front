export function buildURLWithAPIAddress(url: string): string {
	if (!url) {
		return "";
	}

	return process.env.API_URL + url;
}
