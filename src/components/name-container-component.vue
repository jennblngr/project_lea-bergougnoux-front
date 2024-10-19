<template>
	<div class="flex flex-col">
		<router-link :to="LINK_MORE_INFOS">
			<span class="highlighted-text mb-[2px]"> Léa Bergougnoux </span>
		</router-link>
		<span class="mb-[2px]"> Designer graphique </span>
	</div>
</template>

<script setup lang="ts">
import { LINK_MORE_INFOS } from "@src/common/constants";
</script>
