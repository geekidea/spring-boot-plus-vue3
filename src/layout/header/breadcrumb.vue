<template>
	<div class="layout-breadcrumb">
		<SvgIcon class="layout-breadcrumb-icon" :name="settings.isCollapse ? 'ele-expand' : 'ele-fold'" :size="16" @click="changeCollapse" />
		<el-breadcrumb separator="/" class="layout-navbars-breadcrumb-hide">
			<!--			<transition-group name="breadcrumb">-->
			<el-breadcrumb-item v-for="item in breadcrumbList" :key="item.name">
				{{ item.meta.title }}
			</el-breadcrumb-item>
			<!--			</transition-group>-->
		</el-breadcrumb>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useSettingStore } from '@/store/modules/setting';
import { storeToRefs } from 'pinia';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

const route = useRoute();
const { settings } = storeToRefs(useSettingStore());

// 展开/收起左侧菜单点击
const changeCollapse = () => {
	settings.value.isCollapse = !settings.value.isCollapse;
};

const breadcrumbList = ref([]);
// 获取面包屑
const getBreadcrumb = () => {
	breadcrumbList.value = route.matched.filter((item) => item.meta && item.meta.title);
	// 如果面包屑列表的第一个路径不是/home，则将其添加到面包屑列表的第一个位置
	if (breadcrumbList.value[0].path !== '/home') {
		breadcrumbList.value.unshift({
			path: '/',
			meta: { title: '首页' },
		});
	}
};

// 页面加载时
onMounted(() => {
	getBreadcrumb();
});
// 路由更新时
onBeforeRouteUpdate(() => {
	getBreadcrumb();
});
</script>

<style scoped lang="scss">
.layout-breadcrumb {
	display: flex;
	align-items: center;
	height: inherit;
	.layout-breadcrumb-icon {
		cursor: pointer;
		font-size: 18px;
		color: #999;
		height: 100%;
		width: 40px;
		opacity: 0.8;
		&:hover {
			opacity: 1;
		}
	}
}
</style>
