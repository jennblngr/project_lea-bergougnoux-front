<template>
	<section class="relative flex p-16 text-white bg-black h-screen">
		<div class="absolute top-0 left-0 right-0 bottom-0">
			<img
				class="-z-10 h-full w-full object-cover"
				:src="currentHomePageImage"
				:alt="currentHomePageAlt"
			/>
		</div>
		<nav class="absolute top-5 left-5">
			<div
				v-for="navLink of navLinks"
				class="relative text-left pb-[3px] lg:pb-[0px] lg:text-base"
			>
				<router-link
					:to="`/${navLink.slug}`"
					class="pb-[3px] underlined"
				>
					{{ navLink.label }}
				</router-link>
			</div>
		</nav>
	</section>
</template>

<script setup lang="ts">
import clone from "lodash.clonedeep";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

import { useMainStore } from "@src/stores";

import { buildURLWithAPIAddress } from "../helpers/url";
import { LINK_MORE_INFOS } from "@src/common/constants";
import { CategoriesNames } from "@src/common/enums";
import type { Categories } from "@src/common/types";

// #region Hooks
const mainStore = useMainStore();
// #endregion

// #region Data
const intervalId = ref<NodeJS.Timeout>();
const currentImageIndex = ref<number>(0);
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

function updateCurrentHomePageData() {
	currentHomePageImage.value = buildURLWithAPIAddress(mainStore.homePageCarousel[currentImageIndex.value].src);
	currentHomePageAlt.value = mainStore.homePageCarousel[currentImageIndex.value]?.alt || "";
}
// #endregion

// #region Lifecycles
onMounted(() => {
	updateCurrentHomePageData();

	intervalId.value = setInterval(() => {
		currentImageIndex.value = (currentImageIndex.value + 1) % mainStore.homePageCarousel.length;

		updateCurrentHomePageData();
	}, 5000);
});

onBeforeUnmount(() => {
	clearInterval(intervalId.value);
});
// #endregion
</script>
