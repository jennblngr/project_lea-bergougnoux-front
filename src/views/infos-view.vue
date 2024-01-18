<template>
	<split-page-container>
		<template #left-side>
			<div class="relative w-full h-screen overflow-x-hidden">
				<div class="absolute z-50 top-1/2">
					<arrow-back @click="onClickArrowBack" />

					<div class="ms-3 pb-5 flex flex-col gap-14">
						<p class="whitespace-pre-line">
							<markdown-renderer :source="mainStore.infosText" />
						</p>

						<!-- References -->
						<div>
							<h1 class="mb-5 italic">Références</h1>
							<div
								v-for="reference of mainStore.infosReferences"
								:key="reference.id"
								class="flex flex-col"
							>
								<a
									v-if="reference.src"
									:href="reference.src"
									target="_blank"
								>
									{{ reference.name }}
								</a>
								<span v-else>
									{{ reference.name }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<template #right-side>
			<div class="grid grid-cols-7 gap-3 mt-[70vh] pe-3">
				<div class="col-start-6 col-span-2 flex flex-col gap-3">
					<div class="flex items-center gap-2">
						<img
							:src="arrowRight"
							alt="Arrow right"
							height="17"
						/>
						<a
							:href="mainStore.infosCV"
							target="_blank"
						>
							CV
						</a>
					</div>

					<div>© 2023 Léa Bergougnoux et Jenny-Lee B.</div>

					<div class="flex items-center gap-2">
						<img
							:src="arrowRight"
							alt="Arrow right"
							height="17"
						/>
						<router-link to="/mentions-legales">Mentions légales</router-link>
					</div>
				</div>
			</div>
		</template>
	</split-page-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import ArrowBack from "@src/components/arrow-back-component.vue";
import SplitPageContainer from "@src/components/split-page-container-component.vue";
import MarkdownRenderer from "@src/components/markdown-renderer-component.vue";

import arrowRight from "@src/assets/icons/arrow-right.svg";
import { useMainStore } from "@src/stores";

// #region Composables
const mainStore = useMainStore();
const router = useRouter();
// #endregion

// #region Functions
function onClickArrowBack() {
	router.push("/");
}
// #endregion
</script>
