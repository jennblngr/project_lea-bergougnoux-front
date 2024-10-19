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

	onMounted((): void => {
		const links: Array<Element> = [...document.querySelectorAll("a"), ...document.querySelectorAll(".link")];

		links.forEach((link: Element): void => {
			link.addEventListener("mouseenter", onMouseEnterOnLink);
			link.addEventListener("mouseleave", onMouseLeaveOnLink);
		});
	});

	onUnmounted((): void => {
		const links: Array<Element> = [...document.querySelectorAll("a"), ...document.querySelectorAll(".link")];

		links.forEach((link: Element): void => {
			link.addEventListener("mouseenter", () => onMouseEnterOnLink);
			link.addEventListener("mouseleave", () => onMouseLeaveOnLink);
		});
	});

	return { cursorRef };
}
