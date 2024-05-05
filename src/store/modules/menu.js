import { defineStore } from 'pinia';
import { store } from '@/store';

export const useMenuStore = defineStore({
	id: 'menu',
	state: () => ({
		menuList: [],
	}),
	actions: {
		setMenuList(list) {
			this.menuList = list;
		},
	},
});

export function useMenuStoreHook() {
	return useMenuStore(store);
}
