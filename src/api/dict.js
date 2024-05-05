import request from '@/utils/request';

/** 字典列表*/
//修改字典数据
export function updateSysDictApi(data) {
	return request.post({
		url: '/admin/sysDict/updateSysDict',
		data,
	});
}

//字典数据分页列表
export function getSysDictPageApi(data) {
	return request.post({
		url: '/admin/sysDict/getSysDictPage',
		data,
	});
}
//字典数据详情
export function getSysDictApi(id) {
	return request.post({
		url: '/admin/sysDict/getSysDict/' + id,
	});
}
//删除字典数据
export function deleteSysDictApi(id) {
	return request.post({
		url: '/admin/sysDict/deleteSysDict/' + id,
	});
}
//添加字典数据
export function addSysDictApi(data) {
	return request.post({
		url: '/admin/sysDict/addSysDict',
		data,
	});
}

/** 字典类型*/
//修改字典类型
export function updateSysDictTypeApi(data) {
	return request.post({
		url: '/admin/sysDictType/updateSysDictType',
		data,
	});
}
//字典类型分页列表
export function getSysDictTypeListApi(data) {
	return request.post({
		url: '/admin/sysDictType/getSysDictTypeList',
		data,
	});
}
//字典类型详情
export function getSysDictTypeApi(id) {
	return request.post({
		url: '/admin/sysDictType/getSysDictType/' + id,
	});
}
//删除字典类型
export function deleteSysDictTypeApi(id) {
	return request.post({
		url: '/admin/sysDictType/deleteSysDictType/' + id,
	});
}
//添加字典类型
export function addSysDictTypeApi(data) {
	return request.post({
		url: '/admin/sysDictType/addSysDictType',
		data,
	});
}
