import { LAYOUT } from '@/router/constant';

export default [
	{
		path: '/',
		name: 'Layout',
		component: LAYOUT,
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '首页',
					isShow: true,
					icon: 'ele-house',
				},
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/',
		redirect: '/home',
	},
];
