<template>
	<split-page-container v-if="!selectedProject">
		<template #left-side>
			<div class="relative w-full h-screen overflow-x-hidden">
				<div class="lg:absolute l:top-1/2">
					<arrow-back @click="getBackProjectsPage" />

					<div class="ms-5">
						Une erreur s'est produite lors de la récupération du projet.
						<br />
						Revenez plus tard, et n'hésitez pas à me contacter si le problème persiste.
					</div>
				</div>
			</div>
		</template>
	</split-page-container>

	<split-page-container v-else>
		<template #left-side>
			<div class="relative w-full h-full overflow-x-hidden lg:h-screen">
				<div class="absolute top-0 lg:top-1/2">
					<arrow-back @click="getBackProjectsPage" />

					<div class="grid grid-cols-5 gap-3 mb-7">
						<div class="col-span-4 ms-5">
							{{ selectedProject.name }}
						</div>
						<div class="col-start-5 col-span-1">
							{{ selectedProject.year }}
						</div>
					</div>

					<div
						v-if="selectedProject.description?.content"
						class="grid grid-cols-5 mx-5 mb-12"
					>
						<p class="col-span-5 whitespace-pre-line">
							<strapi-blocks :content="selectedProject.description.content" />
						</p>
					</div>

					<div v-if="selectedProject.description?.medias?.length">
						<div
							v-for="media of selectedProject.description.medias"
							:key="media.id"
							class="w-full h-full"
						>
							<img
								v-if="buildURLWithAPIAddress(media.src)"
								class="w-full h-full object-cover"
								:alt="media.alt || ''"
								:src="buildURLWithAPIAddress(media.src)!"
							/>
						</div>
					</div>

					<div
						v-if="mainStore.windowWidth < LG"
						class="relative w-full overflow-x-hidden"
					>
						<div
							v-for="media of selectedProject.medias"
							:key="media.id"
							class="w-full"
						>
							<img
								v-if="buildURLWithAPIAddress(media.src)"
								class="w-full h-full object-contain object-top"
								:alt="media.alt || ''"
								:src="buildURLWithAPIAddress(media.src)!"
							/>
						</div>
					</div>
				</div>
			</div>
		</template>

		<template #right-side>
			<div class="relative w-full overflow-x-hidden lg:h-screen">
				<div
					v-for="media of selectedProject.medias"
					:key="media.id"
					class="w-full"
				>
					<img
						v-if="buildURLWithAPIAddress(media.src)"
						class="w-full h-full object-contain object-top"
						:alt="media.alt || ''"
						:src="buildURLWithAPIAddress(media.src)!"
					/>
				</div>
			</div>
		</template>
	</split-page-container>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { StrapiBlocks } from "@src/components/strapi-blocks-renderer";

import { useRoute, useRouter } from "vue-router";
import { useMouse } from "../composables/mouse";
import { useMainStore } from "@src/stores";

import ArrowBack from "@src/components/arrow-back-component.vue";
import SplitPageContainer from "@src/components/split-page-container-component.vue";
import { slugifyString } from "@src/helpers/slugify";
import { buildURLWithAPIAddress } from "@src/helpers/url";
import { LG } from "@src/common/constants";
import type { Project } from "@src/common/types";

// #region Hooks
useMouse();
const route = useRoute();
const router = useRouter();

const mainStore = useMainStore();
// #endregion

// #region Computed
const selectedProject = computed<Project | null>(() => {
	const projectFound = mainStore.projects.find((project) => slugifyString(project.name) === mainStore.selectedProject);

	if (!projectFound) {
		return null;
	}

	return projectFound;
});
// #endregion

// #region Functions
function getBackProjectsPage() {
	router.push("/categorie/" + mainStore.selectedCategory);
}
// #endregion

// #region Lifecycles
watch(
	() => route.params.project,
	() => {
		if (route.name !== "project") {
			return;
		}

		mainStore.setSelectedCategory(route.params.category as string);
		mainStore.setSelectedProject(route.params.project as string);
	},
	{ deep: true, immediate: true },
);
// #endregion
</script>
