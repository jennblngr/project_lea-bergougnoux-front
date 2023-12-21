import { CategoriesIds, CategoriesNames } from "../enums";

export interface Category {
	id: CategoriesIds | number;
	label: CategoriesNames;
	slug: string;
}

export type Categories = Category[];
