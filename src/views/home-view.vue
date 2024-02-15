<template>
	<section class="relative flex p-16 text-white bg-black h-screen">
		<div class="absolute top-0 left-0 right-0 bottom-0">
			<img
				class="-z-10 h-full w-full object-cover"
				:src="currentHomePageImage"
				:alt="currentHomePageAlt"
			/>
		</div>
		<nav
			class="absolute lg:top-5 lg:left-5"
			:class="{ centered: mainStore.windowWidth < LG }"
		>
			<div
				v-for="navLink of navLinks"
				class="relative x-8 text-center text-4xl lg:text-left lg:pb-[0px] lg:text-base"
			>
				<router-link
					:to="`/${navLink.slug}`"
					class="pb-[3px]"
					:class="{ 'underlined-lg': mainStore.windowWidth < LG, underlined: mainStore.windowWidth >= LG }"
				>
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

import { buildURLWithAPIAddress } from "../helpers/url";
import { LINK_MORE_INFOS, LG } from "@src/common/constants";
import { CategoriesNames } from "@src/common/enums";
import type { Categories } from "@src/common/types";

// #region Hooks
const mainStore = useMainStore();
// #endregion

// #region Data
const currentHomePageImage = ref<string>("");
const currentHomePageAlt = ref<string>("");
// #endregion

// #region Computed
const navLinks = computed<Categories>(() => {
	return [
		...clone(mainStore.categories.map((category) => ({ ...category, slug: `categorie/${category.slug}` }))),
		...[{ id: mainStore.categories.length + 1, label: CategoriesNames.MORE_INFOS, slug: LINK_MORE_INFOS }],
	];
});
// #endregion

// #region Lifecycles
onMounted(() => {
	currentHomePageImage.value = buildURLWithAPIAddress(mainStore.homePageCarousel[0].src);
	currentHomePageAlt.value = mainStore.homePageCarousel[0].alt;

	setInterval(() => {
		let newImage = mainStore.homePageCarousel[Math.floor(Math.random() * mainStore.homePageCarousel.length)];

		while (mainStore.homePageCarousel.length > 1 && currentHomePageImage.value === newImage.src) {
			newImage = mainStore.homePageCarousel[Math.floor(Math.random() * mainStore.homePageCarousel.length)];
		}

		currentHomePageImage.value = buildURLWithAPIAddress(newImage.src);
		currentHomePageAlt.value = newImage?.alt || "";
	}, 5000);
});
// #endregion
</script>
