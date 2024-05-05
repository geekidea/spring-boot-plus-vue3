<template>
	<el-aside class="layout-aside" :class="setCollapseStyle">
		<Logo />
		<el-scrollbar height="100%">
			<Menu :menuList="menuList" />
		</el-scrollbar>
	</el-aside>
</template>
<script setup>
import { defineAsyncComponent, computed } from 'vue';
import { useMenuStore } from '@/store/modules/menu';
import { useSettingStore } from '@/store/modules/setting';
import { storeToRefs } from 'pinia';

const Logo = defineAsyncComponent(() => import('@/layout/components/logo.vue'));
const Menu = defineAsyncComponent(() => import('@/layout/components/menu.vue'));

const { menuList } = storeToRefs(useMenuStore());
const { settings } = storeToRefs(useSettingStore());

// 设置菜单展开/收起时的宽度
const setCollapseStyle = computed(() => {
	if (settings.value.isCollapse) {
		return 'layout-aside-collapse';
	} else {
		return 'layout-aside-expand';
	}
});
</script>

<style scoped lang="scss">
.layout-aside {
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	transition: width 0.3s ease;
	border-right: 1px solid var(--border-color-light);
	&.layout-aside-collapse {
		width: var(--aside-collapse-width);
	}
	&.layout-aside-expand {
		width: var(--aside-expand-width);
	}
}
</style>
