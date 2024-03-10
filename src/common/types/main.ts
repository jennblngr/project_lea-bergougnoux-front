import { type BlocksContent } from "vue-strapi-blocks-renderer";

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
	// General
	windowWidth: number;
}
