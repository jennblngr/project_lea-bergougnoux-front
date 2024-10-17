<template>
	<section class="relative flex p-16 h-screen">
		<div class="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-12">
			<img
				v-if="mainStore.selectedCategory === '' || isProjectHovered"
				class="-z-10 w-full object-cover"
				:class="isProjectHovered ? 'col-start-8 col-span-5' : 'col-span-12 h-full'"
				:src="currentHomePageImage"
				:alt="currentHomePageAlt"
			/>
		</div>

		<nav class="grid grid-cols-12 absolute top-5 left-0 right-0">
			<div class="flex flex-col col-span-12 lg:col-span-6">
				<div
					v-for="navLink of navLinks"
					:key="navLink.id"
					class="relative grid grid-cols-12 lg:grid-cols-6 text-left pb-[3px] ms-5 me-5 lg:me-0 text-4xl lg:pb-[0px] lg:text-3xl"
				>
					<div
						class="col-span-12 lg:col-span-6"
						:class="{
							'underlined-active-lg': mainStore.windowWidth < LG && slugifyString(navLink.label) === mainStore.selectedCategory,
							'underlined-active': mainStore.windowWidth >= LG && slugifyString(navLink.label) === mainStore.selectedCategory,
						}"
					>
						<router-link :to="slugifyString(navLink.label) !== mainStore.selectedCategory ? navLink.slug : '/'">
							<span class="pb-[3px]">
								{{ navLink.label }}
							</span>
						</router-link>

						<div
							v-if="slugifyString(navLink.label) === mainStore.selectedCategory"
							class="grid grid-cols-12 lg:grid-cols-6 text-2xl lg:text-base max-h-[50vh] overflow-y-auto"
						>
							<div
								v-for="project of projectsCategory"
								:key="project.id"
								class="col-start-2 lg:col-start-2 col-span-11 lg:col-span-5"
								@mouseenter="onHoverProject(project.name)"
								@mouseleave="onUnhoverProject"
							>
								<router-link :to="`/categorie/${mainStore.selectedCategory}/projet/${slugifyString(project.name)}`">
									{{ project.name }}
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</section>
</template>

<script setup lang="ts">
import clone from "lodash.clonedeep";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

import { useMouse } from "@src/composables/mouse";
import { useMainStore } from "@src/stores";

import { LG, LINK_MORE_INFOS } from "@src/common/constants";
import { slugifyString } from "@src/helpers/slugify";
import { buildURLWithAPIAddress } from "@src/helpers/url";
import type { Categories, Project } from "@src/common/types";

// #region Hooks
useMouse();

const mainStore = useMainStore();
// #endregion

// #region Data
const intervalId = ref<NodeJS.Timeout>();
const currentImageIndex = ref<number>(0);
const currentHomePageImage = ref<string>("");
const currentHomePageAlt = ref<string>("");
const isProjectHovered = ref<boolean>(false);
// #endregion

// #region Computed
const navLinks = computed<Categories>(() => {
	return [
		...clone(mainStore.categories.map((category) => ({ ...category, slug: `/categorie/${category.slug}` }))),
		...[{ id: mainStore.categories.length + 1, label: "Infos +", slug: LINK_MORE_INFOS }],
	];
});

const projectsCategory = computed<Array<Project>>(() => {
	return mainStore.projects
		.filter((project) => project.categories?.includes(mainStore.selectedCategory))
		.sort((project1, project2) => new Date(project2.createdAt).getTime() - new Date(project1.createdAt).getTime());
});
// #endregion

// #region
function onHoverProject(projectName: Project["name"]): void {
	isProjectHovered.value = true;

	const project = mainStore.projects.find((project) => project.name === projectName);
	const projectCover = project?.cover ?? project?.medias[0] ?? { src: "", alt: "" };

	currentHomePageImage.value = buildURLWithAPIAddress(projectCover.src);
	currentHomePageAlt.value = projectCover.alt;

	clearInterval(intervalId.value);
}

function onUnhoverProject(): void {
	isProjectHovered.value = false;

	currentHomePageImage.value = "";
	currentHomePageAlt.value = "";

	createInterval();
}

function updateCurrentHomePageData(): void {
	currentHomePageImage.value = buildURLWithAPIAddress(mainStore.homePageCarousel[currentImageIndex.value].src);
	currentHomePageAlt.value = mainStore.homePageCarousel[currentImageIndex.value]?.alt || "";
}

function createInterval(): void {
	intervalId.value = setInterval(() => {
		currentImageIndex.value = (currentImageIndex.value + 1) % mainStore.homePageCarousel.length;

		updateCurrentHomePageData();
	}, 5000);
}
// #endregion

// #region Lifecycles
onMounted(() => {
	updateCurrentHomePageData();

	createInterval();
});

onBeforeUnmount(() => {
	clearInterval(intervalId.value);
});
// #endregion
</script>
