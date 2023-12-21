<template>
	<div class="z-50 absolute centered">
		<markdown-renderer :source="mainStore.homePageTitle" />
	</div>

	<router-view />

	<footer-container :vertical-layout="verticalLayout" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";

import FooterContainer from "@src/components/footer-container-component.vue";
import MarkdownRenderer from "@src/components/markdown-renderer-component.vue";

import { useMainStore } from "@src/stores";

// #region Composables
const route = useRoute();

const mainStore = useMainStore();
// #endregion

// #region Computed
const verticalLayout = computed<boolean>(() => {
	const ROUTES_WITH_VERTICAL_FOOTER = ["infos", "mentions"];

	return route.name ? ROUTES_WITH_VERTICAL_FOOTER.includes(route.name as string) : false;
});
// #endregion
</script>
