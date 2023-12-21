import { CategoriesSlugs } from "../enums";
import type { MediaCarousel, Categories, Projects, References } from "./index";

export interface State {
	// Home page
	homePageCarousel: MediaCarousel;
	homePageTitle: string;
	// Categories
	selectedCategory: CategoriesSlugs;
	categories: Categories;
	// Projects
	selectedProject: string;
	projects: Projects;
	// Infos
	infosCV: string;
	infosText: string;
	infosReferences: References;
}
