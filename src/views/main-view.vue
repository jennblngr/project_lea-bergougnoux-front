<template>
	<div>
		<div class="cursor" />

		<div class="z-50 centered hidden lg:block">
			<router-link to="/">
				<strapi-blocks :content="mainStore.homePageTitle" />
			</router-link>
		</div>

		<router-view />

		<footer-container :vertical-layout="verticalLayout" />
	</div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { computed, onMounted, onUnmounted, ref, reactive, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { StrapiBlocks } from "@src/components/strapi-blocks-renderer";

import FooterContainer from "@src/components/footer-container-component.vue";
import { LG } from "@src/common/constants";
import { useMouse } from "@src/composables/mouse";
import { useMainStore } from "@src/stores";

// #region Composables
const route = useRoute();

const mainStore = useMainStore();

const { cursorRef } = useMouse();
// #endregion

// #region Data
const vh = ref<number>(1);
const mousePosition = reactive<{ x: number; y: number }>({ x: 0, y: 0 });

const mainRef = ref<HTMLDivElement | null>();
const boundedCursor = reactive<{ width: number; height: number }>({ width: 0, height: 0 });
// #endregion

// #region Computed
const verticalLayout = computed<boolean>(() => {
	if (mainStore.windowWidth < LG || (mainStore.windowWidth < LG && route.name === "project")) {
		return false;
	}

	const ROUTES_WITH_VERTICAL_FOOTER = ["infos", "mentions", "project"];

	return route.name ? ROUTES_WITH_VERTICAL_FOOTER.includes(route.name as string) : false;
});
// #endregion

// #region Functions
function onWindowResize(event: Event): void | null {
	document.documentElement.style.setProperty("--vh", `${vh.value}px`);

	if (!event.target) {
		return null;
	}

	mainStore.setWindowWidth((event.target as Window).innerWidth);
}

function onMouseMove(event: MouseEvent): void {
	if (!cursorRef.value) {
		return;
	}

	if (["", "transparent"].includes(cursorRef.value.style.backgroundColor)) {
		cursorRef.value.style.backgroundColor = "#FFFFFF";
	}

	mousePosition.x = event.clientX;
	mousePosition.y = event.clientY;
}
// #endregion

// #region Lifecycles
onMounted(() => {
	vh.value = window.innerHeight / 100;
	document.documentElement.style.setProperty("--vh", `${vh.value}px`);

	mainStore.setWindowWidth(window.innerWidth);

	cursorRef.value = document.querySelector<HTMLDivElement>(".cursor");
	mainRef.value = document.querySelector<HTMLDivElement>("#main");

	if (!cursorRef.value || !mainRef.value) {
		return;
	}

	boundedCursor.width = cursorRef.value.getBoundingClientRect().width;
	boundedCursor.height = cursorRef.value.getBoundingClientRect().height;

	window.addEventListener("resize", onWindowResize);
	window.addEventListener("mousemove", onMouseMove);
});

onUnmounted(() => {
	window.removeEventListener("resize", onWindowResize);
	window.removeEventListener("mousemove", onMouseMove);
});
// #endregion

// #region Watchers
watch(
	() => mousePosition,
	() => {
		if (!cursorRef.value) {
			return;
		}

		gsap.set(cursorRef.value, {
			x: mousePosition.x - boundedCursor.width / 2,
			y: mousePosition.y - boundedCursor.height / 2,
		});
	},
	{ immediate: true, deep: true },
);
// #endregion
</script>

<style lang="scss">
.cursor {
	opacity: 0;
}

@media (min-width: 768px) {
	.cursor {
		opacity: 1;
		position: fixed;
		top: 0;
		left: 0;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		pointer-events: none;
		z-index: 100;
		background: transparent;
		transition: opacity 0.2s ease;
	}
}
</style>
