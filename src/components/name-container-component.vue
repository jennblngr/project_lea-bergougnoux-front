<template>
	<div class="flex flex-col">
		<router-link :to="`/${LINK_MORE_INFOS}`">
			<span class="highlighted-text mb-[2px]"> Léa Bergougnoux </span>
		</router-link>
		<span class="mb-[2px]">
			Designer graphique <br v-if="mainStore.windowWidth < 640" />
			et designer de service
		</span>
	</div>
</template>

<script setup lang="ts">
import { useMainStore } from "../stores";
import { LINK_MORE_INFOS } from "@src/common/constants";

// #region Composables
const mainStore = useMainStore();
// #endregion
</script>
