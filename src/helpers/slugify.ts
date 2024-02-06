import slugify from "slugify";

export function slugifyString<T>(baseString: string): T {
	if (!baseString) {
		return "" as T;
	}

	const allowedCharacters = new RegExp(/[A-zÀ-úa-z0-9\-\h]*/g);

	const slugedString = baseString
		.replace("_", "-")
		.split("")
		.filter((character) => allowedCharacters.test(character))
		.join("");

	return slugify(slugedString, {
		lower: true,
	}) as T;
}
