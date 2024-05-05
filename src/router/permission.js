/**
 * 路由权限控制
 *
 */
import { router } from '@/router';
import { closeNProgress, startNProgress } from '@/utils/nprogress';
import { getToken } from '@/utils/token';
import { initBackEndControlRoutes } from '@/router/backEndRoutes';
import { useMenuStore } from '@/store/modules/menu';
import { useSettingStoreHook } from '@/store/modules/setting';
import { ElMessageBox } from 'element-plus';
import { WHITE_LIST } from './constant';
import { NextLoading } from '@/utils/loading';
import { storeToRefs } from 'pinia';
const { settings } = storeToRefs(useSettingStoreHook());

router.beforeEach(async (to, from, next) => {
	startNProgress();
	if (WHITE_LIST.includes(to.path)) {
		next();
	} else if (getToken()) {
		if (useMenuStore().menuList.length > 0 || !settings.value.isBackEndControlRouter) {
			next();
		} else {
			// 界面 loading 动画开始执行
			if (window.nextLoading === undefined) NextLoading.start();
			const routers = await initBackEndControlRoutes();
			if (routers.length > 0) {
				next({ path: to.path, query: to.query });
			} else {
				ElMessageBox.confirm('当前账号权限不足，请联系管理员分配权限。', '提示', {
					confirmButtonText: '确定',
					showCancelButton: false,
					type: 'warning',
				})
					.then(async () => {})
					.catch(() => {});
				next(`/login`);
			}
		}
	} else {
		next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
	}
});

router.afterEach(() => {
	closeNProgress();
});
