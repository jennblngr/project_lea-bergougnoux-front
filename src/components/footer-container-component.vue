<template>
	<div
		v-if="verticalLayout"
		class="grid grid-cols-12 absolute top-5 left-0 right-0"
	>
		<div class="col-start-9 col-span-4">
			<name-container />
		</div>
	</div>

	<footer class="grid grid-cols-12 gap-3 absolute left-0 right-0 bottom-5">
		<div
			v-if="!verticalLayout"
			class="col-span-5 grid grid-cols-5 gap-3"
		>
			<div class="col-start-3 col-span-3">
				<name-container />
			</div>
		</div>

		<div class="col-start-9 col-span-4 grid grid-cols-2 gap-3">
			<!-- Phone number & mail address -->
			<div class="flex flex-col col-span-1">
				<a :href="PHONE_NUMBER">
					<span class="underlined"> 0632510880 </span>
				</a>
				<a :href="MAIL_ADDRESS">
					<span class="underlined"> leabergou@gmail.com </span>
				</a>
			</div>

			<!-- Instagram account & website link -->
			<div class="flex flex-col col-start-2 col-span-1">
				<a :href="LINK_INSTAGRAM">
					<span class="underlined"> @atelier.bergou </span>
				</a>
				<router-link to="/">
					<span class="underlined"> leabergougnoux.com </span>
				</router-link>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import NameContainer from "@src/components/name-container-component.vue";

// #region Data
const LINK_INSTAGRAM: string = "https://www.instagram.com/atelier.bergou/?hl=fr";
const MAIL_ADDRESS: string = "mailto:leabergou@gmail.com";
const PHONE_NUMBER: string = "tel:+33632510880";
// #endregion

interface Props {
	verticalLayout: boolean;
}

withDefaults(defineProps<Props>(), {
	verticalLayout: false,
});
</script>
