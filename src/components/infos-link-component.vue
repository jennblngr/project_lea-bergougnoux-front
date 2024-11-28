<template>
	<div class="flex items-center gap-2">
		<ArrowRight width="17" />
		<a
			:href="mainStore.infosCV"
			target="_blank"
		>
			CV
		</a>
	</div>

	<div>
		© {{ new Date().getFullYear() }} Léa Bergougnoux <br />
		et Jenny-Lee B.
	</div>

	<div class="flex items-center gap-2">
		<ArrowRight width="17" />
		<router-link to="/mentions-legales">Mentions légales</router-link>
	</div>
</template>

<script setup lang="ts">
import ArrowRight from "@src/assets/icons/arrow-right.svg";
import { useMainStore } from "@src/stores";

// #region Composables
const mainStore = useMainStore();
// #endregion
</script>
