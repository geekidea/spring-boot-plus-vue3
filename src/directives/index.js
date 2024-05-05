const modules = import.meta.glob('./modules/*.js', { eager: true });

export function setupDirective(app) {
	// 注册指令
	Object.keys(modules).forEach((key) => {
		const name = key.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')[1];
		app.directive(name, modules[key].default);
	});
}
