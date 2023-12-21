<template>
	<split-page-container>
		<template #left-side>
			<!-- Categories navigation -->
			<div class="w-full flex flex-col gap-7">
				<!-- Arrow up -->
				<div
					class="ps-2 cursor-pointer"
					@click="onClickArrowUp"
				>
					<img
						:src="arrowTop"
						alt="Arrow top"
						height="25"
					/>
				</div>

				<!-- Content -->
				<div class="max-h-[105px] min-h-[105px] overflow-x-hidden overflow-y-auto">
					<div class="flex flex-col justify-center">
						<div
							v-if="!selectedProjects.length"
							class="ms-3"
						>
							Il n'y a pas de projet dans cette catégorie pour l'instant, mais reviens plus tard !
						</div>

						<div
							class="grid grid-cols-5 gap-3"
							v-for="selectedProject of selectedProjects"
							:key="selectedProject.id"
						>
							<router-link
								:to="`/categorie/${mainStore.selectedCategory}/projet/${slugifyString(selectedProject.name)}`"
								class="underlined ms-3 grid grid-cols-4 col-span-4"
								@mouseover="onHoverProjectLink(selectedProject.medias[0].src)"
							>
								<div class="col-span-2">
									{{ selectedProject.name }}
								</div>
								<div class="col-span-2">
									{{ selectedProject.year }}
								</div>
							</router-link>
						</div>
					</div>
				</div>

				<!-- Arrow down -->
				<div
					class="ps-2 cursor-pointer"
					@click="onClickArrowDown"
				>
					<img
						:src="arrowBottom"
						alt="Arrow top"
						height="25"
					/>
				</div>
			</div>
		</template>

		<template #right-side>
			<!-- Highlighted project image -->
			<div class="h-screen col-start-6 col-span-7">
				<img
					v-if="selectedProjects.length"
					class="object-cover w-full h-full"
					:src="hoveredProjectImage"
				/>
			</div>
		</template>
	</split-page-container>
</template>

<script setup lang="ts">
import clone from "lodash.clonedeep";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import SplitPageContainer from "@src/components/split-page-container-component.vue";

import arrowTop from "@src/assets/icons/arrow-top.svg";
import arrowBottom from "@src/assets/icons/arrow-bottom.svg";
import { slugifyString } from "@src/helpers/slugify";
import { buildURLWithAPIAddress } from "@src/helpers/url";
import { useMainStore } from "@src/stores";
import type { Category, Project } from "@src/common/types";

// #region Hooks
const route = useRoute();
const router = useRouter();

const mainStore = useMainStore();
// #endregion

// #region Data
const hoveredProjectImage = ref<string>("");
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
	return mainStore.projects.filter((project) => project.categories?.includes(mainStore.selectedCategory));
});
// #endregion

// #region Functions
function onHoverProjectLink(mediaProjectURL: string): void {
	const mediaProjectURLFilled = buildURLWithAPIAddress(mediaProjectURL);

	if (!mediaProjectURLFilled) {
		return;
	}

	hoveredProjectImage.value = mediaProjectURLFilled;
}

function onClickArrowUp() {
	const indexNewCategory = indexSelectedCategory.value - 1 < 0 ? categoriesBySlugs.value.length : indexSelectedCategory.value;
	const newCategory = categoriesBySlugs.value[indexNewCategory - 1].toString();

	mainStore.setSelectedCategory(newCategory);
	router.push(`/categorie/${newCategory}`);
}
function onClickArrowDown() {
	const indexNewCategory = indexSelectedCategory.value + 1 >= categoriesBySlugs.value.length ? 0 : indexSelectedCategory.value + 1;
	const newCategory = categoriesBySlugs.value[indexNewCategory].toString();

	mainStore.setSelectedCategory(newCategory);
	router.push(`/categorie/${newCategory}`);
}
// #endregion

// #region Lifecycles
watch(
	() => route.params.category,
	() => {
		if (route.name !== "projects") {
			return;
		}

		mainStore.setSelectedCategory(route.params.category as string);

		const mediaProjectURLFilled = buildURLWithAPIAddress(selectedProjects.value[0]?.medias[0]?.src);

		if (!mediaProjectURLFilled) {
			return;
		}

		hoveredProjectImage.value = mediaProjectURLFilled;
	},
	{ deep: true, immediate: true },
);
// #endregion
</script>

<style scoped lang="scss">
.arrow {
	position: relative;
	cursor: pointer;

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
