import request from '@/utils/request';

//登录
export function loginApi(data) {
	return request.post({
		url: '/admin/login',
		data,
	});
}

//获取用户信息
export function getLoginUserInfoApi() {
	return request.post({
		url: '/admin/getLoginUserInfo',
	});
}

//退出登录
export function logoutApi() {
	return request.post({
		url: '/admin/logout',
	});
}
