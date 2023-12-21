import { createApp } from "vue";

import HomeView from "@src/views/home-view.vue";

import "../node_modules/destyle.css/destyle.min.css";

async function main() {
    const app = createApp(HomeView);

    app.mount("#main");
}

main();
