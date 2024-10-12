import graphqlClient from "@src/helpers/graphql";
import { WebsiteConfigurationResponse } from "@src/common/types";
import { GET_WEBSITE_CONFIGURATION } from "@src/helpers/requests";

const HEXADECIMAL_BLACK_COLOR: Readonly<string> = "#000000";
const HEXADECIMAL_WHITE_COLOR: Readonly<string> = "#FFFFFF";

export async function getWebsiteConfiguration(): Promise<{ backgroundColor: string; textColor: string }> {
	return await graphqlClient
		.query<WebsiteConfigurationResponse>({ query: GET_WEBSITE_CONFIGURATION })
		.then(({ data }) => {
			console.debug("[app] response of the 'Website' request:", data);

			return { backgroundColor: data.website.backgroundColor ?? HEXADECIMAL_BLACK_COLOR, textColor: data.website.textColor ?? HEXADECIMAL_WHITE_COLOR };
		})
		.catch((error) => {
			console.error("An error occurred while retrieving the website configuration.", error);

			return { backgroundColor: HEXADECIMAL_BLACK_COLOR, textColor: HEXADECIMAL_WHITE_COLOR };
		});
}
