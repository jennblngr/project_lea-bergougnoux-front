<template>
	<section class="relative flex p-16 text-white bg-black h-screen">
		<div class="absolute top-0 left-0 right-0 bottom-0">
			<img
				class="-z-10 h-full w-full object-cover"
				:src="currentHomePageImage"
			/>
		</div>
		<nav class="relative flex flex-col justify-center items-center">
			<div
				v-for="navLink of navLinks"
				class="underlined relative x-8 pb-[1px]"
			>
				<router-link :to="`/${navLink.slug}`">
					{{ navLink.label }}
				</router-link>
			</div>
		</nav>
	</section>
</template>

<script setup lang="ts">
import clone from "lodash.clonedeep";
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

import { useMainStore } from "@src/stores";

import { LINK_MORE_INFOS } from "@src/common/constants";
import { CategoriesNames } from "@src/common/enums";
import type { Categories } from "@src/common/types";

// #region Hooks
const mainStore = useMainStore();
// #endregion

// #region Data
const currentHomePageImage = ref<string>("");
// #endregion

// #region Computed
const navLinks = computed<Categories>(() => {
	return [
		...clone(mainStore.categories.map((category) => ({ ...category, slug: `categorie/${category.slug}` }))),
		...[{ id: mainStore.categories.length + 1, label: CategoriesNames.MORE_INFOS, slug: LINK_MORE_INFOS }],
	];
});
// #endregion

// #region Functions
function buildMediaURL(src: string) {
	return process.env.API_URL + src;
}
// #endregion

// #region Lifecycles
onMounted(() => {
	currentHomePageImage.value = buildMediaURL(mainStore.homePageCarousel[0].src);

	setInterval(() => {
		let newImage = buildMediaURL(mainStore.homePageCarousel[Math.floor(Math.random() * mainStore.homePageCarousel.length)].src);

		while (currentHomePageImage.value === newImage) {
			newImage = buildMediaURL(mainStore.homePageCarousel[Math.floor(Math.random() * mainStore.homePageCarousel.length)].src);
		}

		currentHomePageImage.value = newImage;
	}, 5000);
});
// #endregion
</script>
