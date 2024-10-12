import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import prettierConfig from "@vue/eslint-config-prettier";

const config = [
	...pluginVue.configs["flat/recommended"],
	...vueTsEslintConfig(),
	prettierConfig,
	{
		files: ["**/*.vue", "**/*.js", "**/*.cjs", "**/*.ts", "**/*.html"],
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				window: "readonly",
				document: "readonly",
				process: "readonly",
			},
		},
		rules: {
			"no-unused-vars": "error",
		},
	},
];

export default config;
