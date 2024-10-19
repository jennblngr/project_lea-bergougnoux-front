import { type BlocksContent } from "@src/components/strapi-blocks-renderer";

import type { Media } from "../types";

export interface Project {
	createdAt: string;
	id: string;
	name: string;
	year: string;
	description?: {
		content?: BlocksContent;
		medias?: Array<Media>;
	};
	medias: Array<Media>;
	categories?: Array<string>;
	cover?: Media;
	isALink?: boolean;
}

export type Projects = Array<Project>;
