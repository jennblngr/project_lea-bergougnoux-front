<template>
	<div class="sticky top-[-1px] mb-14 z-[1000]">
		<img
			class="my-5 ms-5"
			:src="arrowLeft"
			alt="Arrow left"
			width="17"
			@click="onClickArrowLeft"
		/>
	</div>
</template>

<script setup lang="ts">
import arrowLeft from "@src/assets/icons/arrow-left.svg";

type Emits = {
	click: [void];
};

const emit = defineEmits<Emits>();

// #region Functions
function onClickArrowLeft(): void {
	emit("click");
}
// #endregion
</script>
