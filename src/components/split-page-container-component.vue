<template>
	<div class="grid grid-rows-2 grid-cols-1 h-screen overflow-hidden lg:grid-rows-1 lg:grid-cols-12">
		<div class="row-span-1 flex grow items-center relative lg:col-span-6">
			<slot name="left-side" />
		</div>

		<div class="row-span-1 col-span-7 h-full lg:col-start-7">
			<slot name="right-side" />
		</div>
	</div>
</template>

<script setup lang="ts"></script>
