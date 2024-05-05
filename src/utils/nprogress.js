import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
	easing: 'ease', // 动画方式
	speed: 500, // 递增进度条的速度
	showSpinner: false, // 是否显示加载icon
	trickleSpeed: 200, // 自动递增间隔
	minimum: 0.3, // 更改启动时使用的最小百分比
	parent: 'body', //指定进度条的父容器
});

// 开启进度条
export const startNProgress = () => {
	NProgress.start();
};

// 关闭进度条
export const closeNProgress = () => {
	NProgress.done();
};
