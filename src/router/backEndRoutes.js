import { getNavMenuTreeListApi } from '@/api/menu';
import { LAYOUT } from '@/router/constant';
import { useMenuStoreHook } from '@/store/modules/menu';
import basicRouter from '@/router/modules/basic';
import { router } from '@/router';

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('@/views/**/*.vue');

// 后端获取路由
export const initBackEndControlRoutes = async () => {
	const response = await getNavMenuTreeListApi();
	const routers = await formatRouter(response);
	await addDynamicRoutes(routers);
	basicRouter[0].children = basicRouter[0].children.concat(routers);
	useMenuStoreHook().setMenuList(basicRouter[0].children);
	return Promise.resolve(response);
};

// 添加动态路由
export const addDynamicRoutes = async (routes) => {
	routes.forEach((route) => {
		const routeName = route.name;
		if (!router.hasRoute(routeName)) router.addRoute(route);
		if (route.children?.length > 0) {
			addDynamicRoutes(route.children);
		}
	});
};

// 格式化后端返回的路由
export const formatRouter = (routers) => {
	return routers
		.map((route) => {
			if (route.children && route.children.length > 0) {
				route.children = formatRouter(route.children);
			}
			let data = {
				path: route.routeUrl,
				name: route.routeUrl.startsWith('/') ? route.routeUrl.slice(1)[0].toUpperCase() + route.routeUrl.slice(2) : route.routeUrl,
				component: route.type === 1 ? LAYOUT : dynamicImport(route.componentPath),
				children: route.children || [],
				meta: {
					title: route.name,
					icon: route.icon,
					isCache: !!route.isCache,
					isShow: !!route.isShow,
				},
			};
			if (route.type === 1 && route.children?.length > 0) {
				data.redirect = data.children[0].path;
			}
			return data;
		})
		.filter((p) => p.component);
};

// 后端路由 component 转换函数
export const dynamicImport = (component) => {
	const keys = Object.keys(modules);
	const matchKeys = keys.filter((key) => {
		const k = key.split('views/')[1].split('.vue')[0];
		return k === component;
	});
	if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return modules[matchKey];
	}
	if (matchKeys?.length > 1) {
		return false;
	}
};
