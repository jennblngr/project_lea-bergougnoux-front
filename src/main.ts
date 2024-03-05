import { createPinia } from "pinia";
import { createApp } from "vue";

import MainView from "@src/views/main-view.vue";
import { router } from "@src/router";

import "../node_modules/destyle.css/destyle.min.css";
import "@src/assets/styles/index.css";

async function main() {
	const app = createApp(MainView);
	const pinia = createPinia();

	app.use(pinia);
	app.use(router);

	app.mount("#main");
}

main();
