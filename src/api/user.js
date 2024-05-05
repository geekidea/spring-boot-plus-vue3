import request from '@/utils/request';

// 用户分页列表
export function getSysUserPageApi(data) {
	return request.post({
		url: '/admin/sysUser/getSysUserPage',
		data,
	});
}

// 添加用户
export function addSysUserApi(data) {
	return request.post({
		url: '/admin/sysUser/addSysUser',
		data,
	});
}

// 用户详情
export function getSysUserApi(id) {
	return request.post({
		url: '/admin/sysUser/getSysUser/' + id,
	});
}

// 修改用户
export function updateSysUserApi(data) {
	return request.post({
		url: '/admin/sysUser/updateSysUser',
		data,
	});
}

// 删除用户
export function deleteSysUserApi(id) {
	return request.post({
		url: '/admin/sysUser/deleteSysUser/' + id,
	});
}

// 重置系统用户密码
export function resetSysUserPasswordApi(data) {
	return request.post({
		url: '/admin/sysUser/resetSysUserPassword',
		data,
	});
}

// 修改用户密码
export function updatePasswordApi(data) {
	return request.post({
		url: '/admin/sysUser/updatePassword',
		data,
	});
}

// 修改个人信息
export function updateProfileApi(data) {
	return request.post({
		url: '/admin/sysUser/updateProfile',
		data,
	});
}

// 获取个人信息
export function getProfileApi() {
	return request.post({
		url: '/admin/sysUser/getProfile',
	});
}
