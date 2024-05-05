<template>
	<div class="logo-box" v-if="setShowLogo" @click="onThemeConfigChange">
		<img :src="logo" class="logo-img" />
		<span>{{ settings.globalTitle }}</span>
	</div>
	<div class="logo-box" v-else @click="onThemeConfigChange">
		<img :src="logo" class="logo-img" />
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/store/modules/setting';
import logo from '@/assets/logo.png';

const { settings } = storeToRefs(useSettingStore());

// 设置 logo 的显示
const setShowLogo = computed(() => {
	let { isCollapse } = settings.value;
	return !isCollapse;
});
// logo 点击实现菜单展开/收起
const onThemeConfigChange = () => {
	settings.value.isCollapse = !settings.value.isCollapse;
};
</script>

<style scoped lang="scss">
.logo-box {
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: rgb(0 21 41 / 2%) 0 1px 4px;
	font-size: 16px;
	cursor: pointer;
	animation: logoAnimation 0.3s ease-in-out;
	span {
		white-space: nowrap;
		display: inline-block;
	}
	&:hover {
		span {
			color: var(--color-primary-light-2);
		}
	}
	.logo-img {
		width: 30px;
		margin-right: 5px;
		margin-left: 5px;
	}
}
</style>
