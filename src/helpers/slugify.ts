import slugify from "slugify";

export function slugifyString<T>(baseString: string): T {
	if (!baseString) {
		return "" as T;
	}

	const slugedString = baseString
		.replace("_", "-")
		.replace("&", "")
		.replace(".", "")
		.replace("(", "")
		.replace(")", "")
		.replace("!", "")
		.replace("?", "")
		.replace(",", "")
		.replace(", ", "");

	return slugify(slugedString, {
		lower: true,
	}) as T;
}
