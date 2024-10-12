import { defineStore } from "pinia";

import graphqlClient from "@src/helpers/graphql.ts";
import { GET_HOME_PAGE, GET_CATEGORIES, GET_PROJECTS, GET_REFERENCES, GET_INFOS, GET_CV, GET_WEBSITE_CONFIGURATION } from "@src/helpers/requests.ts";
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
import { WebsiteConfigurationResponse } from "@src/common/types/requests.ts";

const HEXA_BLACK_COLOR: Readonly<string> = "#000000";
const HEXA_WHITE_COLOR: Readonly<string> = "#FFFFFF";

export const useMainStore = defineStore("main", {
	state: (): State => ({
		// Home page
		homePageCarousel: [],
		homePageTitle: [],
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
		phoneNumber(state) {
			return state.infosPhone
				.split("")
				.filter((char) => char !== " ")
				.join("");
		},
	},
	actions: {
		// Actions performed to Strapi.
		async getData(): Promise<void> {
			await Promise.all([this.getHomePage(), this.getCategories(), this.getProjects(), this.getInfos(), this.getReferences(), this.getCV(), this.getWebsiteConfiguration()]);
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
							label: category.name as string,
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
								medias: project.media.reduce((acc: Media[], media: MediaComponentResponse) => {
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
									projectFilled.description.medias = project.description.medias.reduce((acc: Media[], media: MediaResponse) => {
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
								projectFilled.categories = project.categories.reduce((acc: string[], category: CategoryResponse) => {
									acc.push(slugifyString<string>(category.name));

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
		async getWebsiteConfiguration(): Promise<void> {
			await graphqlClient
				.query<WebsiteConfigurationResponse>({ query: GET_WEBSITE_CONFIGURATION })
				.then(({ data }) => {
					console.debug("[app] response of the 'Website' request:", data);

					this.backgroundColor = data.website.backgroundColor ?? HEXA_BLACK_COLOR;
					this.textColor = data.website.textColor ?? HEXA_WHITE_COLOR;
				})
				.catch((error) => {
					console.error("An error occurred while retrieving the website configuration.", error);
				});
		},

		// Actions performed from the app.
		setSelectedCategory(categoryName: string): void {
			const slugifiedCategoryName = slugifyString<string>(categoryName);
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
