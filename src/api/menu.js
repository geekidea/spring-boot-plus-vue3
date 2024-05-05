import request from '@/utils/request';

// 获取当前用户的导航菜单
export function getNavMenuTreeListApi() {
	return request.post({
		url: '/admin/sysMenu/getNavMenuTreeList',
	});
}

// 获取所有的系统菜单树形列表
export function getAllSysMenuTreeListApi(data) {
	return request.post({
		url: '/admin/sysMenu/getAllSysMenuTreeList',
		data,
	});
}

// 获取启用的系统菜单树形列表
export function getSysMenuTreeListApi(data) {
	return request.post({
		url: '/admin/sysMenu/getSysMenuTreeList',
		data,
	});
}

// 添加菜单
export function addSysMenuApi(data) {
	return request.post({
		url: '/admin/sysMenu/addSysMenu',
		data,
	});
}
// 菜单详情
export function getSysMenuApi(id) {
	return request.post({
		url: '/admin/sysMenu/getSysMenu/' + id,
	});
}
// 修改菜单
export function updateSysMenuApi(data) {
	return request.post({
		url: '/admin/sysMenu/updateSysMenu',
		data,
	});
}
// 删除菜单
export function deleteSysMenuApi(id) {
	return request.post({
		url: '/admin/sysMenu/deleteSysMenu/' + id,
	});
}
