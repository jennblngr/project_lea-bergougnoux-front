<template>
	<div
		v-if="verticalLayout"
		class="grid grid-cols-12 absolute top-5 left-0 right-0 p-5"
	>
		<div class="col-start-9 col-span-4 lg:col-start-10 lg:col-span-3 xl:col-start-9 xl:col-span-4">
			<name-container />
		</div>
	</div>

	<footer
		class="flex justify-between absolute left-0 right-0 bottom-0 px-5 py-3 lg:grid lg:grid-cols-12"
		:style="{ backgroundColor: mainStore.windowWidth < LG && route.name === 'project' ? mainStore.backgroundColor : 'transparent' }"
	>
		<div
			v-if="!verticalLayout"
			class="col-span-6 grid grid-cols-6 lg:ms-0 lg:col-span-5 lg:grid-cols-5"
		>
			<div class="col-span-6 sm:col-span-4 lg:col-start-3 lg:col-span-3 lg:ms-0">
				<name-container />
			</div>
		</div>

		<div
			class="col-start-8 col-span-5 grid lg:grid-rows-2 sm:col-start-9 sm:col-span-4 lg:col-start-10 lg:col-span-3 xl:col-start-9 xl:col-span-4 xl:grid-rows-1 xl:grid-cols-2"
		>
			<div
				v-if="mainStore.windowWidth < LG"
				class="row-span-1 flex flex-col xl:pe-3 xl:pb-0 xl:me-0"
			>
				<a :href="MAIL_ADDRESS">
					<span> leabergou@gmail.com </span>
				</a>
				<a
					:href="LINK_INSTAGRAM"
					target="_blank"
				>
					<span> @atelier.bergou </span>
				</a>
			</div>

			<!-- Phone number & mail address -->
			<div
				v-if="mainStore.windowWidth >= LG"
				class="row-span-1 lg:pb-3 flex flex-col xl:pe-3 xl:pb-0 xl:me-0"
			>
				<a :href="phoneNumberHref">
					<span> {{ mainStore.phoneNumber }} </span>
				</a>
				<a :href="MAIL_ADDRESS">
					<span> leabergou@gmail.com </span>
				</a>
			</div>

			<!-- Instagram account & website link -->
			<div
				v-if="mainStore.windowWidth >= LG"
				class="row-span-1 flex flex-col xl:me-0"
			>
				<a
					:href="LINK_INSTAGRAM"
					target="_blank"
				>
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
import { computed } from "vue";
import { useRoute } from "vue-router";

import NameContainer from "@src/components/name-container-component.vue";
import { useMainStore } from "@src/stores";
import { LG } from "@src/common/constants";

interface Props {
	verticalLayout?: boolean;
}

withDefaults(defineProps<Props>(), {
	verticalLayout: false,
});

// #region Composables
const route = useRoute();

const mainStore = useMainStore();
// #endregion

// #region Data
const LINK_INSTAGRAM: string = "https://www.instagram.com/atelier.bergou/?hl=fr";
const MAIL_ADDRESS: string = "mailto:leabergou@gmail.com";
// #endregion

// #region Computed
const phoneNumberHref = computed<string>(() => {
	return `tel:+` + mainStore.phoneNumber.split("").slice(1, mainStore.phoneNumber.length).join("");
});
// #endregion
</script>
