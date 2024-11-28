<template>
	<div class="sticky top-[-1px] mb-14 z-[1000]">
		<ArrowLeft class="my-5 ms-5" width="17"  @click="onClickArrowLeft" />
	</div>
</template>

<script setup lang="ts">
import ArrowLeft from "@src/assets/icons/arrow-left.svg";

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
