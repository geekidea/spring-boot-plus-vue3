<template>
	<div class="navbar-box h-full">
		<div class="navbar-box-item">
			<Notify />
		</div>
		<div class="navbar-box-item">
			<Theme />
		</div>
		<div>
			<User />
		</div>
	</div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const Notify = defineAsyncComponent(() => import('@/layout/header/notify.vue'));
const Theme = defineAsyncComponent(() => import('@/layout/header/theme.vue'));
const User = defineAsyncComponent(() => import('@/layout/header/user.vue'));
</script>

<style scoped lang="scss">
.navbar-box {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	.navbar-box-item {
		padding: 0 10px;
		cursor: pointer;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100%;

		&:hover {
			background: rgba(0, 0, 0, 0.04);
		}
	}
}
</style>
