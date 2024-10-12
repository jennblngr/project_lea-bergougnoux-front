import { createPinia } from "pinia";
import { createApp, nextTick } from "vue";

import MainView from "@src/views/main-view.vue";
import { router } from "@src/router";
import { getWebsiteConfiguration } from "@src/helpers/website-configuration";

import "../node_modules/destyle.css/destyle.min.css";
import "@src/assets/styles/index.css";

async function main(): Promise<void> {
	const app = createApp(MainView);

	const { backgroundColor, textColor } = await getWebsiteConfiguration();

	await nextTick(() => {
		const htmlElement: HTMLHtmlElement | null = document.querySelector("html");

		if (!htmlElement) {
			return;
		}

		htmlElement.style.backgroundColor = backgroundColor;
		htmlElement.style.color = textColor;
	});

	const pinia = createPinia();

	app.use(pinia);
	app.use(router);

	app.mount("#main");
}

(() => main())();
