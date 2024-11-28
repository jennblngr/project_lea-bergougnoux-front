<template>
	<section class="relative flex p-16 h-screen">
		<div class="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-12">
			<img
				v-if="mainStore.openedCategories.length === 0 || isProjectHovered"
				class="-z-10 w-full object-cover"
				:class="isProjectHovered ? 'col-start-8 col-span-5' : 'col-span-12 h-full'"
				:src="currentHomePageImage"
				:alt="currentHomePageAlt"
			/>
		</div>

		<nav class="grid grid-cols-12 absolute top-5 left-0 right-0">
			<div class="flex flex-col col-span-12 gap-1 pb-1 md:col-span-6">
				<div
					v-for="navLink of navLinks"
					:key="navLink.id"
					class="relative grid grid-cols-12 text-left text-4xl pb-[3px] ms-5 me-5 md:grid-cols-6 md:me-0 md:pb-[0px] md:text-3xl"
				>
					<div
						class="col-span-12 md:col-span-5"
						:class="['underlined', navLink.isOpened ? 'underlined-active' : '']"
					>
						<span
							class="link pb-[2px]"
							@click="onClickProjectLabel(navLink.slug)"
						>
							{{ navLink.label }}
						</span>

						<div
							v-if="navLink.isOpened"
							class="grid grid-cols-12 max-h-[50vh] pb-1 overflow-y-auto text-base"
						>
							<div
								v-for="project of projectsByCategorySlug[navLink.slug]"
								:key="project.id"
								class="col-start-2 col-span-11 leading-[1.05rem] md:col-start-2"
								@mouseenter="onHoverProject(project.name)"
								@mouseleave="onUnhoverProject"
							>
								<router-link :to="`/categorie/${navLink.slug}/projet/${slugifyString(project.name)}`">
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
import { clone } from "lodash";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useMouse } from "@src/composables/mouse";
import { useMainStore } from "@src/stores";

import { LINK_MORE_INFOS } from "@src/common/constants";
import { slugifyString } from "@src/helpers/slugify";
import { buildURLWithAPIAddress } from "@src/helpers/url";
import { type Category, type Project } from "@src/common/types";

// #region Enums/Interfaces/Types
interface Link extends Category {
	isOpened?: boolean;
}

type Links = Array<Link>;
// #endregion

// #region Hooks
useMouse();

const router = useRouter();

const mainStore = useMainStore();
// #endregion

// #region Data
const INFOS_PLUS_LABEL: string = "Infos +";

const currentHomePageAlt = ref<string>("");
const currentHomePageImage = ref<string>("");
const currentImageIndex = ref<number>(0);
const intervalId = ref<NodeJS.Timeout>();
const isProjectHovered = ref<boolean>(false);
// #endregion

// #region Computed
const navLinks = computed<Links>(() => {
	return [
		...mainStore.categories.map((category) => ({
			...category,
			isOpened: mainStore.openedCategories.includes(category.slug),
		})),
		{
			id: mainStore.categories.length + 1,
			label: INFOS_PLUS_LABEL,
			slug: slugifyString(INFOS_PLUS_LABEL),
		},
	];
});

const projectsByCategorySlug = computed<Record<string, Array<Project>>>(() => {
	return mainStore.projects.reduce((acc: Record<string, Array<Project>>, project: Project) => {
		if (!project.categories?.length) {
			return acc;
		}

		project.categories.forEach((category) => {
			acc[category] ??= [];
			acc[category].push(project);
		});

		return acc;
	}, {});
});
// #endregion

// #region
function createInterval(): void {
	updateCurrentHomePageData();

	intervalId.value = setInterval(() => {
		currentImageIndex.value = (currentImageIndex.value + 1) % mainStore.homePageCarousel.length;

		updateCurrentHomePageData();
	}, 5000);
}

function onClickProjectLabel(projectLabel: Category["label"]): void {
	if (projectLabel === slugifyString(INFOS_PLUS_LABEL)) {
		router.push(LINK_MORE_INFOS);
	}

	const newOpenedCategories = clone(mainStore.openedCategories);

	if (!newOpenedCategories.includes(projectLabel)) {
		newOpenedCategories.push(projectLabel);
	} else {
		newOpenedCategories.splice(newOpenedCategories.indexOf(projectLabel), 1);
	}

	mainStore.setOpenedCategories(newOpenedCategories);
}

function onHoverProject(projectName: Project["name"]): void {
	clearInterval(intervalId.value);

	isProjectHovered.value = true;

	const project = mainStore.projects.find((project) => project.name === projectName);
	const projectCover = project?.cover ?? project?.medias[0] ?? { src: "", alt: "" };

	currentHomePageImage.value = buildURLWithAPIAddress(projectCover.src);
	currentHomePageAlt.value = projectCover.alt;
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
// #endregion

// #region Lifecycles
onMounted(() => {
	createInterval();
});

onBeforeUnmount(() => {
	clearInterval(intervalId.value);
});
// #endregion
</script>
