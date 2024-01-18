<template>
	<div class="z-50 centered hidden lg:block">
		<router-link to="/">
			<markdown-renderer :source="mainStore.homePageTitle" />
		</router-link>
	</div>

	<router-view />

	<footer-container :vertical-layout="verticalLayout" />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { RouterView, useRoute } from "vue-router";

import FooterContainer from "@src/components/footer-container-component.vue";
import MarkdownRenderer from "@src/components/markdown-renderer-component.vue";

import { LG } from "@src/common/constants";
import { useMainStore } from "@src/stores";

// #region Composables
const route = useRoute();

const mainStore = useMainStore();
// #endregion

// #region Computed
const verticalLayout = computed<boolean>(() => {
	if (mainStore.windowWidth < LG || (mainStore.windowWidth < LG && route.name === "project")) {
		return false;
	}

	const ROUTES_WITH_VERTICAL_FOOTER = ["infos", "mentions", "project"];

	console.log("🚀 ~ verticalLayout ~ route.name:", route.name);
	return route.name ? ROUTES_WITH_VERTICAL_FOOTER.includes(route.name as string) : false;
});
// #endregion

// #region Functions
function setWindowWidth(event: Event): void | null {
	if (!event.target) {
		return null;
	}

	mainStore.setWindowWidth((event.target as Window).innerWidth);
}
// #endregion

// #region Lifecycles
onMounted(() => {
	mainStore.setWindowWidth(window.innerWidth);
	window.addEventListener("resize", setWindowWidth);
});

onUnmounted(() => {
	window.removeEventListener("resize", setWindowWidth);
});
// #endregion
</script>
