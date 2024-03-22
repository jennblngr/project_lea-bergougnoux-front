<template>
	<split-page-container>
		<template #left-side>
			<div class="relative w-full h-screen overflow-x-hidden">
				<div class="absolute z-50 top-1/2">
					<arrow-back @click="onClickArrowBack" />

					<div class="mx-5 pb-[9rem] flex flex-col gap-14">
						<p class="whitespace-pre-line">
							<strapi-blocks :content="mainStore.infosText" />
						</p>

						<!-- References -->
						<div>
							<h3 class="mb-5 italic"><em> Références : </em></h3>
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

						<div class="grid grid-cols-12 gap-3">
							<div class="col-span-6 flex flex-col gap-3">
								<infos-link-component v-if="mainStore.windowWidth < LG" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<template #right-side>
			<div class="absolute bottom-[22vh] left-1/2 right-0 grid grid-cols-6">
				<div class="col-start-4 col-span-2 flex flex-col gap-3 lg:col-start-4 lg:col-span-2 xl:col-start-5">
					<infos-link-component />
				</div>
			</div>
		</template>
	</split-page-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { StrapiBlocks } from "@src/components/strapi-blocks-renderer";

import { useMouse } from "../composables/mouse";
import { useMainStore } from "@src/stores";

import ArrowBack from "@src/components/arrow-back-component.vue";
import SplitPageContainer from "@src/components/split-page-container-component.vue";
import InfosLinkComponent from "@src/components/infos-link-component.vue";
import { LG } from "@src/common/constants";

// #region Composables
useMouse();

const mainStore = useMainStore();
const router = useRouter();
// #endregion

// #region Functions
function onClickArrowBack() {
	router.push("/");
}
// #endregion
</script>
