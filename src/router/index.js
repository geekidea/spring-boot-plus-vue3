import { createRouter, createWebHashHistory } from 'vue-router';

const modules = import.meta.glob('./modules/**/*.js', { eager: true });

// 加入到路由集合
const basicRoutes = [];
Object.keys(modules).forEach((key) => {
	const mod = modules[key].default || {};
	const route = Array.isArray(mod) ? [...mod] : [mod];
	basicRoutes.push(...route);
});

export const router = createRouter({
	history: createWebHashHistory(),
	routes: basicRoutes,
});

export function setupRouter(app) {
	app.use(router);
}
