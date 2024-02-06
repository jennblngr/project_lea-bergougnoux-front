import vue from "@vitejs/plugin-vue";
import EnvironmentPlugin from "vite-plugin-environment";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

export default defineConfig({
	base: "/",
	plugins: [vue(), EnvironmentPlugin("all")],
	resolve: {
		alias: {
			"@root": fileURLToPath(new URL("./", import.meta.url)),
			"@src": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		base: "/",
		host: "127.0.0.1",
	},
});
