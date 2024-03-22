import { type BlocksContent } from "@src/components/strapi-blocks-renderer";

import { CategoriesSlugs } from "../enums";
import type { Media } from "../types";

export interface Project {
	createdAt: string;
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
