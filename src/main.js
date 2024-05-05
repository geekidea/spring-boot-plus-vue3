import { createApp } from 'vue';
import App from './App.vue';

import { setupRouter } from './router';
import { setupStore } from './store';
import { setupDirective } from '@/directives';
import '@/router/permission';
import 'virtual:svg-icons-register';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import '@/styles/index.scss';

const app = createApp(App);

/** 全局注册element icon图标组件*/
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component('ele-' + key.replace(/([a-z])([A-Z])/g, '$1-$2').toLocaleLowerCase(), component);
}

app.use(ElementPlus, {
	locale: zhCn,
});

/** 配置自定义指令*/
setupDirective(app);

/** 配置 路由*/
setupRouter(app);

/** 配置 store*/
setupStore(app);

app.mount('#app');
