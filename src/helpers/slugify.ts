import slugify from "slugify";

export function slugifyString(baseString: string): string {
	if (!baseString) {
		return "";
	}

	const allowedCharacters = new RegExp(/[A-zÀ-úa-z0-9\-\h]*/g);

	const sluggedString = baseString
		.replace("_", "-")
		.split("")
		.filter((character) => allowedCharacters.test(character))
		.join("");

	return slugify(sluggedString, {
		lower: true,
	});
}
