import { onMounted, onUnmounted, ref } from "vue";

const cursorRef = ref<HTMLDivElement | null>();

export function useMouse() {
	function onMouseEnterOnLink(): void {
		if (!cursorRef.value) {
			return;
		}

		cursorRef.value.style.opacity = "0.7";
	}

	function onMouseLeaveOnLink(): void {
		if (!cursorRef.value) {
			return;
		}

		cursorRef.value.style.opacity = "1";
	}

	onMounted(() => {
		document.querySelectorAll("a").forEach((link) => {
			link.addEventListener("mouseenter", onMouseEnterOnLink);
			link.addEventListener("mouseleave", onMouseLeaveOnLink);
		});
	});

	onUnmounted(() => {
		document.querySelectorAll("#main a").forEach((link) => {
			link.addEventListener("mouseenter", () => onMouseEnterOnLink);
			link.addEventListener("mouseleave", () => onMouseLeaveOnLink);
		});
	});

	return { cursorRef };
}
