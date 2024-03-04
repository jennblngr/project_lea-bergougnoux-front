<template>
	<div
		v-if="verticalLayout"
		class="grid grid-cols-12 absolute top-5 left-0 right-0 gap-3"
	>
		<div class="col-start-9 col-span-4">
			<name-container />
		</div>
	</div>

	<footer class="grid grid-cols-12 gap-3 absolute left-5 right-5 bottom-5">
		<div
			v-if="!verticalLayout"
			class="col-span-6 grid grid-cols-6 gap-3 lg:col-span-5 lg:grid-cols-5"
		>
			<div class="col-span-6 sm:col-span-4 lg:col-start-3 lg:col-span-3 lg:ms-0">
				<name-container />
			</div>
		</div>

		<div
			class="col-start-8 col-span-5 sm:col-start-9 sm:col-span-4 grid grid-rows-2 gap-3 lg:col-start-10 lg:col-span-3 xl:col-start-9 xl:col-span-4 xl:grid-rows-1 xl:grid-cols-2"
		>
			<!-- Phone number & mail address -->
			<div class="row-span-1 flex flex-col xl:me-0">
				<a :href="PHONE_NUMBER">
					<span> 0632510880 </span>
				</a>
				<a :href="MAIL_ADDRESS">
					<span> leabergou@gmail.com </span>
				</a>
			</div>

			<!-- Instagram account & website link -->
			<div class="row-span-1 flex flex-col xl:me-0">
				<a :href="LINK_INSTAGRAM">
					<span> @atelier.bergou </span>
				</a>
				<router-link to="/">
					<span> leabergougnoux.com </span>
				</router-link>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import NameContainer from "@src/components/name-container-component.vue";

interface Props {
	verticalLayout?: boolean;
}

withDefaults(defineProps<Props>(), {
	verticalLayout: false,
});

// #region Data
const LINK_INSTAGRAM: string = "https://www.instagram.com/atelier.bergou/?hl=fr";
const MAIL_ADDRESS: string = "mailto:leabergou@gmail.com";
const PHONE_NUMBER: string = "tel:+33632510880";
// #endregion
</script>
