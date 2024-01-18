<template>
	<div
		@click="onClickArrowLeft"
		class="sticky top-[-1px] py-5 ps-3 mb-14 cursor-pointer bg-black"
	>
		<img
			:src="arrowLeft"
			alt="Arrow left"
			width="17"
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
function onClickArrowLeft() {
	emit("click");
}
// #endregion
</script>
