import { createPersistedState } from "pinia-plugin-persistedstate";
import { createPinia, type Pinia } from "pinia";
import { createApp, nextTick, type App } from "vue";

import MainView from "@src/views/main-view.vue";
import { router } from "@src/router";
import { getWebsiteConfiguration } from "@src/helpers/website-configuration";

import "../node_modules/destyle.css/destyle.min.css";
import "@src/assets/styles/index.css";
import { useMainStore } from "./stores";

async function main(): Promise<void> {
	const app: App<Element> = createApp(MainView);

	const { backgroundColor, textColor } = await getWebsiteConfiguration();

	await nextTick(() => {
		const htmlElement: HTMLHtmlElement | null = document.querySelector("html");

		if (!htmlElement) {
			return;
		}

		htmlElement.style.backgroundColor = backgroundColor;
		htmlElement.style.color = textColor;
		document.documentElement.style.setProperty("--text-color", textColor);
	});

	const pinia: Pinia = createPinia();

	pinia.use(
		createPersistedState({
			storage: sessionStorage,
		}),
	);

	app.use(pinia);

	const mainStore = useMainStore();

	mainStore.setWebsiteConfiguration({ backgroundColor, textColor });

	app.use(router);

	app.mount("#main");
}

(() => main())();
