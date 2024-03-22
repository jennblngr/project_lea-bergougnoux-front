<template>
	<split-page-container>
		<template #left-side>
			<!-- Content -->
			<div class="w-full overflow-x-hidden overflow-y-auto">
				<div class="flex flex-col justify-center">
					<div
						v-if="!selectedProjects.length"
						class="ms-5"
					>
						Il n'y a pas de projet dans la catégorie "{{ mainStore.selectedCategory }}" pour l'instant, <br />
						mais reviens plus tard !
					</div>

					<div
						v-for="selectedProject of selectedProjects"
						:key="selectedProject.id"
						class="grid grid-cols-12"
						@mouseover="onHoverProjectLink(selectedProject)"
					>
						<!-- It is a link if there's a description, at least one image in the description, or more than one image in the medias project. -->
						<router-link
							v-if="selectedProject.isALink"
							:to="`/categorie/${mainStore.selectedCategory}/projet/${slugifyString(selectedProject.name)}`"
							class="underlined col-span-12 grid grid-cols-12 lg:col-span-11 lg:grid-cols-11 ms-5"
						>
							<div class="col-span-9">{{ selectedProject.name }}</div>
							<div class="col-span-2">{{ selectedProject.year }}</div>
						</router-link>

						<!-- Instead, it is not a link. -->
						<span
							v-else
							class="col-span-12 grid grid-cols-12 lg:col-span-11 lg:grid-cols-11 ms-5"
							:class="{ 'underlined-active': hoveredProjectName === selectedProject.name }"
						>
							<div class="col-span-9">{{ selectedProject.name }}</div>
							<div class="col-span-2">{{ selectedProject.year }}</div>
						</span>
					</div>
				</div>
			</div>

			<!-- Arrow down -->
			<div
				class="absolute left-5 bottom-[10%] lg:bottom-[22vh]"
				@click="onClickArrowDown"
			>
				<img
					:src="arrowBottom"
					alt="Arrow bottom"
					height="17"
				/>
			</div>
		</template>

		<template #right-side>
			<!-- Highlighted project image -->
			<div class="h-full col-start-6 col-span-7 lg:h-screen">
				<img
					v-if="selectedProjects.length"
					class="object-contain object-left-top w-full"
					:src="hoveredProjectImage"
				/>
			</div>
		</template>
	</split-page-container>
</template>

<script setup lang="ts">
import clone from "lodash.clonedeep";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "@src/stores";
import { useMouse } from "../composables/mouse";

// import arrowTop from "@src/assets/icons/arrow-top.svg";
import arrowBottom from "@src/assets/icons/arrow-bottom.svg";
import SplitPageContainer from "@src/components/split-page-container-component.vue";
import { LG } from "@src/common/constants";
import { slugifyString } from "@src/helpers/slugify";
import { buildURLWithAPIAddress } from "@src/helpers/url";
import type { Category, Media, Project } from "@src/common/types";

// #region Hooks
useMouse();

const route = useRoute();
const router = useRouter();

const mainStore = useMainStore();
// #endregion

// #region Data
const intervalId = ref<NodeJS.Timeout>();
const currentImageIndex = ref<number>(0);
const hoveredProjectName = ref<string>("");
const hoveredProjectImage = ref<string>("");
const hoveredProjectImageAlt = ref<string>("");
// #endregion

// #region Computed
const categoriesBySlugs = computed<string[]>(() => {
	return clone(mainStore.categories).reduce((acc: string[], category: Category) => {
		acc.push(category.slug);
		return acc;
	}, []);
});

const indexSelectedCategory = computed<number>(() => categoriesBySlugs.value.indexOf(mainStore.selectedCategory));

const selectedProjects = computed<Project[]>(() => {
	return mainStore.projects
		.filter((project) => project.categories?.includes(mainStore.selectedCategory))
		.map((project) => {
			return {
				...project,
				isALink: (project.description && (project.description.content || project.description.medias?.length || project.medias.length > 1)) as boolean,
			};
		});
});

const selectedProjectsImages = computed<Media[]>(() => {
	return selectedProjects.value.reduce((acc: Media[], selectedProject) => {
		acc.push(selectedProject.cover ? selectedProject.cover : selectedProject.medias[0]);

		return acc;
	}, []);
});
// #endregion

// #region Functions
function onHoverProjectLink(project: Project): void {
	const mediaProjectURLFilled = buildURLWithAPIAddress(project.medias[0].src);

	if (!mediaProjectURLFilled) {
		return;
	}

	hoveredProjectName.value = project.name;
	hoveredProjectImage.value = mediaProjectURLFilled;
	hoveredProjectImageAlt.value = project.medias[0]?.alt || "";
}

// function onClickArrowUp() {
// 	const indexNewCategory = indexSelectedCategory.value - 1 < 0 ? categoriesBySlugs.value.length : indexSelectedCategory.value;
// 	const newCategory = categoriesBySlugs.value[indexNewCategory - 1].toString();

// 	mainStore.setSelectedCategory(newCategory);
// 	router.push(`/categorie/${newCategory}`);
// }

function onClickArrowDown() {
	const indexNewCategory = indexSelectedCategory.value + 1 >= categoriesBySlugs.value.length ? 0 : indexSelectedCategory.value + 1;
	const newCategory = categoriesBySlugs.value[indexNewCategory].toString();

	mainStore.setSelectedCategory(newCategory);
	router.push(`/categorie/${newCategory}`);
}

function updateHoveredProjectData() {
	hoveredProjectName.value = selectedProjects.value[currentImageIndex.value].name;
	hoveredProjectImage.value = buildURLWithAPIAddress(selectedProjectsImages.value[currentImageIndex.value].src);
	hoveredProjectImageAlt.value = selectedProjectsImages.value[currentImageIndex.value]?.alt || "";
}
// #endregion

// #region Watchers
watch(
	() => route.params.category,
	() => {
		if (route.name !== "projects") {
			return;
		}

		mainStore.setSelectedCategory(route.params.category as string);

		updateHoveredProjectData();
	},
	{ deep: true, immediate: true },
);
// #endregion

// #region Lifecycles
onMounted(() => {
	updateHoveredProjectData();

	if (mainStore.windowWidth > LG) {
		clearInterval(intervalId.value);

		return;
	}

	intervalId.value = setInterval(() => {
		currentImageIndex.value = (currentImageIndex.value + 1) % selectedProjectsImages.value.length;

		updateHoveredProjectData();
	}, 5000);
});

onBeforeUnmount(() => {
	clearInterval(intervalId.value);
});
// #endregion
</script>

<style scoped lang="scss">
.arrow {
	position: relative;

	&__body {
		position: absolute;
		left: calc(0.75rem + 7px);
		height: 15px;
		width: 1px;
		background-color: #ffffff;
		transition: width 0.2s ease-in-out;
	}

	&__tip {
		position: absolute;
		left: 0.77rem;
		height: 14px;
		width: 14px;
		border-top: 1px solid #ffffff;
		border-right: 1px solid #ffffff;
		transition: left 0.2s ease-in-out;
	}

	&--up .arrow {
		&__body {
			bottom: 0px;
		}
		&__tip {
			bottom: 0px;
			transform: rotate(-45deg);
		}
	}

	&--down .arrow {
		&__body {
			top: 0px;
		}
		&__tip {
			top: 0px;
			transform: rotate(135deg);
		}
	}
}
</style>
