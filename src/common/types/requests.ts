import { type BlocksContent } from "@src/components/strapi-blocks-renderer";

import { Formats } from "./medias";

export interface CategoryResponse {
	attributes: { name: string };
}
export interface CategoriesResponse {
	categories: {
		data: Array<CategoryResponse>;
	};
}

export interface HomePageResponse {
	homepage: {
		data: {
			attributes: {
				carousel: {
					data: Array<MediaResponse>;
				};
				content: BlocksContent;
			};
		};
	};
}

export interface InfosResponse {
	info: {
		data: {
			attributes: {
				content: BlocksContent;
				phone: string;
				address: {
					street: string;
					cp: string;
					city: string;
				};
			};
		};
	};
}

export interface CVResponse {
	cv: {
		data: {
			attributes: {
				src: string;
			};
		};
	};
}

export interface MediaResponse {
	id: string;
	attributes: {
		url: string;
		alternativeText: string;
		formats: Formats;
	};
}
export interface MediaComponentResponse {
	source: {
		data: {
			id: string;
			attributes: {
				url: string;
				alternativeText: string;
				formats: Formats;
			};
		};
	};
}

export interface ProjectResponse {
	id: string;
	attributes: {
		createdAt: string;
		name: string;
		year: string;
		description?: {
			content?: BlocksContent;
			medias?: {
				data: Array<MediaResponse>;
			};
		};
		categories?: {
			data: Array<CategoryResponse>;
		};
		media: Array<MediaComponentResponse>;
		cover: {
			data: {
				id: string;
				attributes: {
					formats: Formats;
					alternativeText: string;
					url: string;
				};
			};
		};
	};
}
export interface ProjectsResponse {
	projects: {
		data: Array<ProjectResponse>;
	};
}

export interface ReferenceResponse {
	id: string;
	name: string;
	src: string;
}

export interface ReferencesResponse {
	reference: {
		data: {
			attributes: {
				url: Array<ReferenceResponse>;
			};
		};
	};
}
