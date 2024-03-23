<template>
	<section class="relative flex p-16 text-white bg-black h-screen">
		<div class="absolute top-0 left-0 right-0 bottom-0">
			<img
				class="-z-10 h-full w-full object-cover"
				:src="currentHomePageImage"
				:alt="currentHomePageAlt"
			/>
		</div>

		<nav class="grid grid-cols-12 absolute top-5 left-0 right-0">
			<div class="flex flex-col col-span-12 lg:col-span-6">
				<router-link
					v-for="navLink of navLinks"
					class="relative grid grid-cols-12 text-left pb-[3px] ms-5 me-5 lg:me-0 text-4xl lg:pb-[0px] lg:text-base"
					:to="`/${navLink.slug}`"
				>
					<div
						class="col-span-12 lg:col-span-11"
						:class="{ 'underlined-lg': mainStore.windowWidth < LG, underlined: mainStore.windowWidth >= LG }"
					>
						<span class="pb-[3px]">
							{{ navLink.label }}
						</span>
					</div>
				</router-link>
			</div>
		</nav>
	</section>
</template>

<script setup lang="ts">
console.log("oh mais kwa un console log sauvage apparaît");
console.log("nous sommes encerclés");
import clone from "lodash.clonedeep";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

import { useMouse } from "@src/composables/mouse";
import { useMainStore } from "@src/stores";

import { buildURLWithAPIAddress } from "../helpers/url";
import { LG, LINK_MORE_INFOS } from "@src/common/constants";
import { CategoriesNames } from "@src/common/enums";
import type { Categories } from "@src/common/types";

// #region Hooks
useMouse();

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
