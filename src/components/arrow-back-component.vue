<template>
	<div class="sticky top-[-1px] mb-14">
		<img
			@click="onClickArrowLeft"
			class="my-5 ms-5 bg-black cursor-pointer"
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
