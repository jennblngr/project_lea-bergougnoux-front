import { type BlocksContent } from "@src/components/strapi-blocks-renderer";

import { CategoriesSlugs } from "../enums";
import type { MediaCarousel, Categories, Projects, References } from "./index";

export interface State {
	// Home page
	homePageCarousel: MediaCarousel;
	homePageTitle: BlocksContent;
	// Categories
	selectedCategory: CategoriesSlugs;
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
}
