import { defineStore } from "pinia";

import graphqlClient from "@src/helpers/graphql";
import { GET_HOME_PAGE, GET_CATEGORIES, GET_PROJECTS, GET_REFERENCES, GET_INFOS, GET_CV } from "@src/helpers/requests";
import { slugifyString } from "@src/helpers/slugify";

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
	persist: true,
	state: (): State => ({
		// Home page
		homePageCarousel: [],
		homePageTitle: [],
		openedCategories: [],
		// Categories
		selectedCategory: "",
		categories: [],
		// Projects
		selectedProject: "",
		projects: [],
		// Infos
		infosCV: "",
		infosText: [],
		infosReferences: [],
		infosPhone: "",
		infosAddress: {
			street: "",
			cp: "",
			city: "",
		},
		// General
		windowWidth: 0,
		// Website configuration
		backgroundColor: "",
		textColor: "",
	}),
	getters: {
		phoneNumber(state): string {
			return state.infosPhone
				.split("")
				.filter((char) => char !== " ")
				.join("");
		},
	},
	actions: {
		// Actions performed to Strapi.
		async getData(): Promise<void> {
			await this.getHomePage();
			await this.getInfos();
			await this.getCategories();
			await this.getProjects();
			await this.getReferences();
			await this.getCV();
		},
		async getHomePage(): Promise<void> {
			return await graphqlClient
				.query<HomePageResponse>({ query: GET_HOME_PAGE })
				.then(({ data }) => {
					console.debug("[app] response of the 'HomePage' request:", data);

					// Fill the home page title.
					this.homePageTitle = data.homepage.content;
					// Fill the home page carousel.
					this.homePageCarousel = data.homepage.carousel.reduce((acc: MediaCarousel, media: MediaResponse) => {
						const mediaDef: Media = {
							id: media.documentId,
							src: media.url,
							alt: media.alternativeText,
							formats: media.formats,
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
					console.debug("[app] response of the 'Categories' request:", data);

					this.categories = data.categories.reduce((acc: Categories, category: CategoryResponse, index: number) => {
						const categoryLink: Category = {
							id: index + 1,
							label: category.name,
							slug: slugifyString(category.name),
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
					console.debug("[app] response of the 'Projects' request:", data);

					this.projects = data.projects
						.reduce((acc: Projects, project: ProjectResponse) => {
							const projectFilled: Project = {
								id: project.documentId,
								createdAt: project.createdAt,
								name: project.name,
								year: project.year,
								medias: project.media.reduce((acc: Array<Media>, media: MediaComponentResponse) => {
									if (!media.source.documentId) {
										return acc;
									}

									const mediaFilled: Media = {
										id: media.source.documentId,
										alt: media.source.alternativeText,
										src: media.source.url,
										formats: media.source.formats,
									};

									acc.push(mediaFilled);

									return acc;
								}, []),
							};

							if (project.description) {
								projectFilled.description = {};

								if (project.description.content) {
									projectFilled.description.content = project.description.content;
								}

								if (project.description.medias) {
									projectFilled.description.medias = project.description.medias.reduce((acc: Array<Media>, media: MediaResponse) => {
										const mediaFilled: Media = {
											id: media.documentId,
											alt: media.alternativeText,
											src: media.url,
											formats: media.formats,
										};

										acc.push(mediaFilled);

										return acc;
									}, []);
								}
							}

							if (project.categories) {
								projectFilled.categories = project.categories.reduce((acc: Array<string>, category: CategoryResponse) => {
									acc.push(slugifyString(category.name));

									return acc;
								}, []);
							}

							if (project.cover) {
								projectFilled.cover = {
									id: project.cover.documentId,
									formats: project.cover.formats,
									alt: project.cover.alternativeText,
									src: project.cover.url,
								};
							}

							acc.push(projectFilled);

							return acc;
						}, [])
						.sort((project1, project2) => {
							if (project1.createdAt < project2.createdAt) {
								return -1;
							}

							if (project1.createdAt > project2.createdAt) {
								return 1;
							}

							return 0;
						});
				})
				.catch((error) => {
					console.error("An error occurred while retrieving the projects:", error);
				});
		},
		async getInfos(): Promise<void> {
			await graphqlClient
				.query<InfosResponse>({ query: GET_INFOS })
				.then(({ data }) => {
					console.debug("[app] response of the 'Infos' request:", data);

					this.infosText = data.info.content;
					this.infosPhone = data.info.phone;
					this.infosAddress = data.info.address;
				})
				.catch((error) => {
					console.error("An error occurred while retrieving the infos.", error);
				});
		},
		async getReferences(): Promise<void> {
			await graphqlClient
				.query<ReferencesResponse>({ query: GET_REFERENCES })
				.then(({ data }) => {
					console.debug("[app] response of the 'References' request:", data);

					this.infosReferences = data.reference.url.reduce((acc: References, url: ReferenceResponse) => {
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
					console.debug("[app] response of the 'CV' request:", data);

					this.infosCV = data.cv.src;
				})
				.catch((error) => {
					console.error("An error occurred while retrieving the CV.", error);
				});
		},

		// Actions performed from the app.
		setOpenedCategories(categoriesName: Array<string>): void {
			this.openedCategories = categoriesName.map((categoryName: string) => slugifyString(categoryName));
		},
		setSelectedCategory(categoryName: string): void {
			this.selectedCategory = slugifyString(categoryName);
		},
		setSelectedProject(projectName: string): void {
			this.selectedProject = slugifyString(projectName);
		},
		setWindowWidth(windowWidth: number): void {
			this.windowWidth = windowWidth;
		},
		setWebsiteConfiguration(websiteConfiguration: { backgroundColor: string; textColor: string }): void {
			this.backgroundColor = websiteConfiguration.backgroundColor;
			this.textColor = websiteConfiguration.textColor;
		}
	},
});
