import request from '@/utils/request';

// 获取数据库表
export function getDbTablePageApi(data) {
	return request.post({
		url: '/admin/generator/getDbTablePage',
		data,
	});
}

// 生成代码
export function generatorCodeApi(data) {
	return request.post({
		url: '/admin/generator/generatorCode',
		data,
	});
}

// 下载代码
export function downloadCodeApi(data) {
	return request.post({
		url: '/admin/generator/downloadCode',
		data,
		axiosConfig: {
			responseType: 'blob',
		},
	});
}

// 修改生成代码表
export function updateGeneratorTableApi(data) {
	return request.post({
		url: '/admin/generator/updateGeneratorTable',
		data,
	});
}

// 生成代码表详情
export function getGeneratorTableApi(tableName) {
	return request.post({
		url: '/admin/generator/getGeneratorTable/' + tableName,
	});
}

// 预览代码
export function previewCodeApi(tableName) {
	return request.post({
		url: '/admin/generator/previewCode/' + tableName,
	});
}
