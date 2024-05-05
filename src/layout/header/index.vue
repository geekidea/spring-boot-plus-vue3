<template>
	<el-header class="layout-header">
		<div class="flex bg-white h-full header-navbar">
			<div class="layout-header-left h-full">
				<Breadcrumb />
			</div>
			<div class="layout-header-right h-full">
				<Navbar />
			</div>
		</div>
	</el-header>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const Breadcrumb = defineAsyncComponent(() => import('@/layout/header/breadcrumb.vue'));
const Navbar = defineAsyncComponent(() => import('@/layout/header/navbar.vue'));
</script>

<style scoped lang="scss">
.layout-header {
	height: var(--header-height);
	width: 100%;
	background-color: var(--header-bg-color);
	padding: 0 !important;
	.header-navbar {
		border-bottom: 1px solid var(--border-color-light);
		.layout-header-left {
			flex: 1;
		}
		.layout-header-right {
			flex: 1;
		}
	}
}
</style>
