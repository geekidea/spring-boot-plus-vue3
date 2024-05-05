import { defineStore } from 'pinia';
import { store } from '@/store';

export const useSettingStore = defineStore({
	id: 'setting',
	state: () => ({
		settings: {
			/**
			 * 布局
			 * */
			// 布局切换
			layout: 'defaults',
			// 是否折叠
			isCollapse: false,

			/**
			 * 系统
			 */
			// 网页标题
			globalTitle: 'SPRING BOOT',
			// 是否后端控制路由
			isBackEndControlRouter: true,
		},
	}),
	actions: {},
});

export function useSettingStoreHook() {
	return useSettingStore(store);
}
