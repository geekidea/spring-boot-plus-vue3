import { defineStore } from 'pinia';
import { loginApi, getLoginUserInfoApi, logoutApi } from '@/api/system';
import { setToken, removeToken } from '@/utils/token';
import { formatGreet } from '@/utils';
import { ElNotification } from 'element-plus';
import { router } from '@/router';
import { store } from '@/store';

export const useUserStore = defineStore({
	id: 'userInfo',
	state: () => ({
		userInfo: {},
	}),
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage,
				key: 'userInfo',
				paths: ['userInfo'],
			},
		],
	},
	actions: {
		/**
		 * @description:登录
		 * */
		async login(data) {
			return new Promise((resolve) => {
				loginApi(data).then((res) => {
					if (res) {
						setToken(res.token, 1000 * 60 * 60 * 2);
						this.getLoginUserInfo().then((userRes) => {
							ElNotification({
								title: '登录成功',
								message: `${formatGreet(new Date())}，${userRes.nickname}`,
								type: 'success',
							});
							resolve(res);
						});
					}
				});
			});
		},
		/**
		 * @description:获取登录用户信息
		 * */
		async getLoginUserInfo() {
			return new Promise((resolve) => {
				getLoginUserInfoApi().then((res) => {
					this.userInfo = res;
					resolve(res);
				});
			});
		},

		// 清除登录修改信息
		async clear() {
			removeToken();
			this.$reset();
			// useTabsStore().$reset();
			localStorage.removeItem('userinfo');
			localStorage.removeItem('tabsList');
		},

		/**
		 * @description:退出登录
		 * */
		async logout() {
			logoutApi().then(() => {
				this.clear();
				router.push('/login');
			});
		},
	},
});
export function useUserStoreHook() {
	return useUserStore(store);
}
