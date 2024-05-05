<template>
	<el-main class="layout-main">
		<el-scrollbar ref="layoutMainScrollbarRef">
			<LayoutRouterView />
		</el-scrollbar>
	</el-main>
</template>

<script setup>
import { defineAsyncComponent, onMounted } from 'vue';
import { NextLoading } from '@/utils/loading';

const LayoutRouterView = defineAsyncComponent(() => import('@/layout/routerView/index.vue'));

// 页面加载时
onMounted(() => {
	NextLoading.done(600);
});
</script>

<style scoped lang="scss"></style>
