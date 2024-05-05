<template>
	<el-menu router :default-active="defaultActive" :collapse="settings.isCollapse">
		<SubItem :child="menuList" />
	</el-menu>
</template>

<script setup>
import { defineAsyncComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/store/modules/setting';

const SubItem = defineAsyncComponent(() => import('@/layout/components/subItem.vue'));
const route = useRoute();

defineProps({
	menuList: {
		type: Array,
		default: () => [],
	},
});

const { settings } = storeToRefs(useSettingStore());

const defaultActive = computed(() => route.path);
</script>

<style scoped lang="scss"></style>
