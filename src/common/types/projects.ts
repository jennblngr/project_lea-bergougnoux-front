import { type BlocksContent } from "vue-strapi-blocks-renderer";

import { CategoriesSlugs } from "../enums";
import type { Media } from "../types";

export interface Project {
	id: string;
	name: string;
	year: string;
	description?: {
		content?: BlocksContent;
		medias?: Media[];
	};
	medias: Media[];
	categories?: CategoriesSlugs[];
	cover?: Media;
	isALink?: boolean;
}

export type Projects = Project[];
