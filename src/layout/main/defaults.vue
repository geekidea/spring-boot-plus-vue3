<template>
	<el-container class="layout-container">
		<LayoutAside />
		<el-container class="layout-container-view h-full">
			<el-scrollbar>
				<LayoutHeader />
				<LayoutMain ref="layoutMainRef" />
			</el-scrollbar>
		</el-container>
	</el-container>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const LayoutAside = defineAsyncComponent(() => import('@/layout/aside/index.vue'));
const LayoutHeader = defineAsyncComponent(() => import('@/layout/header/index.vue'));
const LayoutMain = defineAsyncComponent(() => import('@/layout/components/main.vue'));
</script>

<style scoped lang="scss">
.layout-container {
	width: 100%;
	height: 100%;
	background-color: #f8f8f8;
}
</style>
