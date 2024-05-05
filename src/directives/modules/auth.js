import { useUserStoreHook } from '@/store/modules/user';

/**
 * @description 按钮权限
 *  @param value 需要验证的权限值
 * */
// 导出默认的指令
export default {
	// 指令挂载时调用
	mounted(el, binding) {
		// 获取指令的值和参数
		const { value, arg } = binding;
		// 获取用户信息
		const { userInfo } = useUserStoreHook();
		// 如果不是管理员
		if (!userInfo.admin) {
			// 判断是否具有权限
			let isPermission = false;
			// 如果指令的值是字符串
			if (typeof value === 'string') {
				// 判断userinfo.permissions中是否存在value中的某一个值
				isPermission = userInfo.permissions.some((item) => item === value);
				// 如果指令的值是数组
			} else if (Array.isArray(value)) {
				// 判断userinfo.permission中是否存在value中的某一个值
				if (arg === 'some') {
					isPermission = userInfo.permissions.some((item) => value.includes(item));
					// 判断userinfo.permission中是否包含value中的每一个值
				} else {
					// 判断userinfo.permission中是否包含value中的每一个值
					isPermission = value.every((item) => userInfo.permissions.includes(item));
				}
				// 如果指令的值不是字符串也不是数组
			} else {
				// 抛出错误
				throw new Error("Only supports types of 'string' or 'string[]'");
			}
			// 如果不具有权限
			if (!isPermission) {
				// 隐藏元素
				el.style.display = 'none';
			}
		}
	},
};
