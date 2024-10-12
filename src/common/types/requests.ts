import { type BlocksContent } from "@src/components/strapi-blocks-renderer";

import { Formats } from "./medias";
import { IDocumentDefinition } from "@apollo/client";

export type CategoryResponse = { name: string };

export interface CategoriesResponse {
	categories: Array<CategoryResponse>;
}

export interface HomePageResponse {
	homepage: {
		documentId: IDocumentDefinition;
		carousel: Array<MediaResponse>;
		content: BlocksContent;
	};
}

export interface MediaResponse {
	documentId: string;
	url: string;
	alternativeText: string;
	formats: Formats;
}

export interface MediaComponentResponse {
	source: MediaResponse;
}

export interface ProjectResponse {
	documentId: string;
	createdAt: string;
	name: string;
	year: string;
	description?: {
		content?: BlocksContent;
		medias?: Array<MediaResponse>;
	};
	categories?: Array<CategoryResponse>;
	media: Array<MediaComponentResponse>;
	cover?: MediaResponse;
}
export interface ProjectsResponse {
	projects: Array<ProjectResponse>;
}

export interface InfosResponse {
	info: {
		content: BlocksContent;
		phone: string;
		address: {
			street: string;
			cp: string;
			city: string;
		};
	};
}

export interface ReferenceResponse {
	id: string;
	name: string;
	src: string;
}

export interface ReferencesResponse {
	reference: {
		url: Array<ReferenceResponse>;
	};
}

export interface CVResponse {
	cv: {
		src: string;
	};
}

export interface WebsiteConfigurationResponse {
	website: {
		backgroundColor: string | null;
		textColor: string | null;
	};
}
