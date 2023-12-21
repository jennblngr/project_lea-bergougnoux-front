import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import { useMainStore } from "@src/stores";

import Home from "@src/views/home-view.vue";
import Project from "@src/views/project-view.vue";
import Projects from "@src/views/projects-view.vue";
import Infos from "@src/views/infos-view.vue";
import Mentions from "@src/views/mentions-view.vue";

const routes: RouteRecordRaw[] = [
	{
		component: Home,
		name: "home",
		path: "/",
	},
	{
		component: Projects,
		name: "projects",
		path: "/categorie/:category",
	},
	{
		component: Project,
		name: "project",
		path: "/categorie/:category/projet/:project",
	},
	{
		component: Infos,
		name: "infos",
		path: "/infos-plus",
	},
	{
		component: Mentions,
		name: "mentions",
		path: "/mentions-legales",
	},
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(async (_to, _from, next) => {
	const mainStore = useMainStore();

	await mainStore
		.getData()
		.then(() => {
			console.info("Data initialized.");
		})
		.catch((error) => {
			console.error("An error occured while retrieving the data:", error);
		});

	next();
});
