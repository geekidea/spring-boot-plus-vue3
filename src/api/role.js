import request from '@/utils/request';

// 角色分页列表
export function getSysRolePageApi(data) {
	return request.post({
		url: '/admin/sysRole/getSysRolePage',
		data,
	});
}
// 系统所有角色列表
export function getSysRoleAllListApi(data) {
	return request.post({
		url: '/admin/sysRole/getSysRoleAllList',
		data,
	});
}
// 获取角色权限
export function getMenuIdsByRoleIdApi(id) {
	return request.post({
		url: '/admin/sysRole/getMenuIdsByRoleId/' + id,
	});
}
// 设置角色权限
export function setRoleMenusApi(data) {
	return request.post({
		url: '/admin/sysRole/setRoleMenus',
		data,
	});
}
// 添加角色
export function addSysRoleApi(data) {
	return request.post({
		url: '/admin/sysRole/addSysRole',
		data,
	});
}
// 角色详情
export function getSysRoleApi(id) {
	return request.post({
		url: '/admin/sysRole/getSysRole/' + id,
	});
}
// 修改角色
export function updateSysRoleApi(data) {
	return request.post({
		url: '/admin/sysRole/updateSysRole',
		data,
	});
}
// 删除角色
export function deleteSysRoleApi(id) {
	return request.post({
		url: '/admin/sysRole/deleteSysRole/' + id,
	});
}
