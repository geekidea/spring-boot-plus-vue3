<template>
	<component :is="layouts[settings.layout]" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { useSettingStore } from '@/store/modules/setting';
import { storeToRefs } from 'pinia';

const { settings } = storeToRefs(useSettingStore());

// 引入组件
const layouts = {
	defaults: defineAsyncComponent(() => import('./main/defaults.vue')),
};
</script>

<style scoped></style>
