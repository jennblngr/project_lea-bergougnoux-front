<template>
	<div
		class="grid grid-cols-1 h-screen overflow-hidden lg:grid-rows-1 lg:grid-cols-12"
		:class="isRightSideDisplayed ? 'grid-rows-2' : 'grid-rows-1'"
	>
		<div class="row-span-1 flex grow items-center relative lg:col-span-6">
			<slot name="left-side" />
		</div>

		<div
			v-if="isRightSideDisplayed"
			class="row-span-1 col-span-7 h-full lg:col-start-7"
		>
			<slot name="right-side" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { LG } from "@src/common/constants";
import { useMainStore } from "@src/stores";

// #region Composables
const mainStore = useMainStore();
const route = useRoute();
// #endregion

// #region Data
const isRightSideDisplayed = ref<boolean>(true);
// #endregion

// #region Lifecycles
watch(
	() => mainStore.windowWidth,
	() => {
		if ((route.name === "infos" || route.name === "project") && mainStore.windowWidth < LG) {
			isRightSideDisplayed.value = false;
		} else {
			isRightSideDisplayed.value = true;
		}
	},
	{ immediate: true },
);
// #endregion
</script>
