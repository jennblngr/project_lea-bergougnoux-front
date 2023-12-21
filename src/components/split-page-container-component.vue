<template>
	<div class="grid grid-cols-12 h-screen">
		<div class="col-span-5 flex grow items-center relative">
			<slot name="left-side" />
		</div>

		<div class="col-start-6 col-span-7 h-screen">
			<slot name="right-side" />
		</div>
	</div>
</template>

<script setup lang="ts"></script>
