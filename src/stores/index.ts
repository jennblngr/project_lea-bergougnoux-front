import { defineStore } from "pinia";

import graphqlClient from "@src/helpers/graphql.ts";
import { GET_HOME_PAGE, GET_CATEGORIES, GET_PROJECTS, GET_REFERENCES, GET_INFOS, GET_CV } from "@src/helpers/requests.ts";
import { slugifyString } from "@src/helpers/slugify";

import { CategoriesNames, CategoriesSlugs } from "@src/common/enums";
import type {
	Categories,
	CategoriesResponse,
	Category,
	CategoryResponse,
	CVResponse,
	HomePageResponse,
	InfosResponse,
	Media,
	MediaCarousel,
	MediaComponentResponse,
	MediaResponse,
	ProjectResponse,
	Project,
	Projects,
	ProjectsResponse,
	Reference,
	References,
	ReferencesResponse,
	State,
	ReferenceResponse,
} from "@src/common/types";

export const useMainStore = defineStore("main", {
	state: (): State => ({
		// Home page
		homePageCarousel: [],
		homePageTitle: "",
		// Categories
		selectedCategory: CategoriesSlugs.EMPTY,
		categories: [],
		// Projects
		selectedProject: "",
		projects: [],
		// Infos
		infosCV: "",
		infosText: "",
		infosReferences: [],
		// General
		windowWidth: 0,
	}),
	getters: {},
	actions: {
		// Actions performed to Strapi.
		async getData(): Promise<void> {
			await this.getHomePage();
			await this.getCategories();
			await this.getProjects();
			await this.getInfos();
			await this.getReferences();
			await this.getCV();
		},
		async getHomePage(): Promise<void> {
			return await graphqlClient
				.query<HomePageResponse>({ query: GET_HOME_PAGE })
				.then(({ data }) => {
					// Fill the home page title.
					this.homePageTitle = data.homepage.data.attributes.text;
					// Fill the home page carousel.
					this.homePageCarousel = data.homepage.data.attributes.carousel.data.reduce((acc: MediaCarousel, media: MediaResponse) => {
						const mediaDef: Media = {
							id: media.id,
							src: media.attributes.url,
							alt: media.attributes.alternativeText,
							formats: media.attributes.formats,
						};

						acc.push(mediaDef);

						return acc;
					}, []);
				})
				.catch((error) => {
					console.error("An error occurred while retrieving the home page title.", error);
				});
		},
		async getCategories(): Promise<void> {
			return await graphqlClient
				.query<CategoriesResponse>({ query: GET_CATEGORIES })
				.then(({ data }) => {
					this.categories = data.categories.data.reduce((acc: Categories, category: CategoryResponse, index: number) => {
						const categoryLink: Category = {
							id: index + 1,
							label: category.attributes.name as CategoriesNames,
							slug: slugifyString(category.attributes.name),
						};

						acc.push(categoryLink);

						return acc;
					}, []);
				})
				.catch((error) => {
					console.error("An error occurred while retrieving the categories.", error);
				});
		},
		async getProjects(): Promise<void> {
			return await graphqlClient
				.query<ProjectsResponse>({ query: GET_PROJECTS })
				.then(({ data }) => {
					this.projects = data.projects.data.reduce((acc: Projects, project: ProjectResponse) => {
						const projectFilled: Project = {
							id: project.id,
							name: project.attributes.name,
							year: project.attributes.year,
							medias: project.attributes.media.reduce((acc: Media[], media: MediaComponentResponse) => {
								if (!media.source.data.id) {
									return acc;
								}

								const mediaFilled: Media = {
									id: media.source.data.id,
									alt: media.source.data.attributes.alternativeText,
									src: media.source.data.attributes.url,
									formats: media.source.data.attributes.formats,
								};

								acc.push(mediaFilled);

								return acc;
							}, []),
						};

						if (project.attributes.description) {
							projectFilled.description = {};

							if (project.attributes.description.text) {
								projectFilled.description.text = project.attributes.description.text;
							}

							if (project.attributes.description.medias) {
								projectFilled.description.medias = project.attributes.description.medias.data.reduce((acc: Media[], media: MediaResponse) => {
									const mediaFilled: Media = {
										id: media.id,
										alt: media.attributes.alternativeText,
										src: media.attributes.url,
										formats: media.attributes.formats,
									};

									acc.push(mediaFilled);

									return acc;
								}, []);
							}
						}

						if (project.attributes.categories) {
							projectFilled.categories = project.attributes.categories.data.reduce((acc: CategoriesSlugs[], category: CategoryResponse) => {
								acc.push(slugifyString<CategoriesSlugs>(category.attributes.name));

								return acc;
							}, []);
						}

						acc.push(projectFilled);

						return acc;
					}, []);
				})
				.catch((error) => {
					console.error("An error occurred while retrieving the projects:", error);
				});
		},
		async getInfos(): Promise<void> {
			await graphqlClient
				.query<InfosResponse>({ query: GET_INFOS })
				.then(({ data }) => {
					this.infosText = data.info.data.attributes.text;
				})
				.catch((error) => {
					console.error("An error occurred while retrieving the references.", error);
				});
		},
		async getReferences(): Promise<void> {
			await graphqlClient
				.query<ReferencesResponse>({ query: GET_REFERENCES })
				.then(({ data }) => {
					this.infosReferences = data.reference.data.attributes.url.reduce((acc: References, url: ReferenceResponse) => {
						const referenceFilled: Reference = {
							id: url.id,
							name: url.name,
							src: url.src,
						};

						acc.push(referenceFilled);

						return acc;
					}, []);
				})
				.catch((error: Error) => {
					console.error("An error occurred while retrieving the references.", error);
				});
		},
		async getCV(): Promise<void> {
			await graphqlClient
				.query<CVResponse>({ query: GET_CV })
				.then(({ data }) => {
					this.infosCV = data.cv.data.attributes.src;
				})
				.catch((error) => {
					console.error("An error occurred while retrieving the CV.", error);
				});
		},

		// Actions performed from the app.
		setSelectedCategory(categoryName: string): void {
			const slugifiedCategoryName = slugifyString<CategoriesSlugs>(categoryName);
			this.selectedCategory = slugifiedCategoryName;

			if (window.localStorage.getItem("category") === slugifiedCategoryName) {
				return;
			}
		},
		setSelectedProject(projectName: string): void {
			const slugifiedProjectName = slugifyString<string>(projectName);
			this.selectedProject = slugifiedProjectName;

			if (window.localStorage.getItem("project") === slugifiedProjectName) {
				return;
			}
		},
		setWindowWidth(windowWidth: number): void {
			this.windowWidth = windowWidth;
		},
	},
});
