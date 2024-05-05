import request from '@/utils/request';

// 修改系统配置
export function updateSysConfigApi(data) {
	return request.post({
		url: '/admin/sysConfig/updateSysConfig',
		data,
	});
}

// 系统配置分页列表
export function getSysConfigPageApi(data) {
	return request.post({
		url: '/admin/sysConfig/getSysConfigPage',
		data,
	});
}
// 系统配置详情
export function getSysConfigApi(id) {
	return request.post({
		url: '/admin/sysConfig/getSysConfig/' + id,
	});
}
// 删除系统配置
export function deleteSysConfigApi(id) {
	return request.post({
		url: '/admin/sysConfig/deleteSysConfig/' + id,
	});
}
// 添加系统配置
export function addSysConfigApi(data) {
	return request.post({
		url: '/admin/sysConfig/addSysConfig',
		data,
	});
}
