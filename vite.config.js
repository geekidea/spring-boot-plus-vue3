import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import pkg from './package.json';
import dayjs from 'dayjs';
import Components from 'unplugin-vue-components/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const pathResolve = (dir) => {
	return resolve(__dirname, '.', dir);
};

const alias = {
	'@': pathResolve('./src'),
};

export default defineConfig((mode) => {
	const env = loadEnv(mode.mode, process.cwd());

	const { VITE_PUBLIC_PATH, VITE_PORT, VITE_OPEN, VITE_PROXY_URL, VITE_DROP_CONSOLE, VITE_BASE_URL } = env;

	const { dependencies, devDependencies, name, version } = pkg;
	const __APP_INFO__ = {
		pkg: { dependencies, devDependencies, name, version },
		lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
	};

	return {
		plugins: [
			vue(),
			// 自动按需引入global文件夹内的组件，
			Components({
				dirs: [pathResolve('./src/components/global')],
			}),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
				// 指定符号id的命名方式
				symbolId: 'svg-[name]',
			}),
		],
		root: process.cwd(),
		base: VITE_PUBLIC_PATH,
		resolve: {
			alias,
		},
		server: {
			host: true,
			port: VITE_PORT,
			open: JSON.parse(VITE_OPEN),
			proxy: {
				[VITE_BASE_URL]: {
					target: VITE_PROXY_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(new RegExp(`^${VITE_BASE_URL}`), ''),
				},
			},
		},
		esbuild: {
			pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
		},
		define: {
			__APP_INFO__: JSON.stringify(__APP_INFO__),
		},
	};
});
