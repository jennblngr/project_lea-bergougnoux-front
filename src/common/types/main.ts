import { type BlocksContent } from "@src/components/strapi-blocks-renderer";

import type { MediaCarousel, Categories, Projects, References } from "./index";

export interface State {
	// Home page
	homePageCarousel: MediaCarousel;
	homePageTitle: BlocksContent;
	// Categories
	selectedCategory: string;
	categories: Categories;
	// Projects
	selectedProject: string;
	projects: Projects;
	// Infos
	infosCV: string;
	infosText: BlocksContent;
	infosReferences: References;
	infosPhone: string;
	infosAddress: {
		street: string;
		cp: string;
		city: string;
	};
	// General
	windowWidth: number;
	// Website configuration
	backgroundColor: string;
	textColor: string;
}
