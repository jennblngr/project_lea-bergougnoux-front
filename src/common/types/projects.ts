import { CategoriesSlugs } from "../enums";
import type { Media } from "../types";

export interface Project {
	id: string;
	name: string;
	year: string;
	description?: {
		text?: string;
		medias?: Media[];
	};
	medias: Media[];
	categories?: CategoriesSlugs[];
	cover?: Media;
	isALink?: boolean;
}

export type Projects = Project[];
