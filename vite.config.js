import vue from "@vitejs/plugin-vue";
import EnvironmentPlugin from "vite-plugin-environment";
import svgLoader from "vite-svg-loader";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

export default defineConfig({
	base: "/",
	plugins: [vue(), EnvironmentPlugin("all"), svgLoader()],
	resolve: {
		alias: {
			"@root": fileURLToPath(new URL("./", import.meta.url)),
			"@src": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		base: "/",
		host: "0.0.0.0",
	},
});
