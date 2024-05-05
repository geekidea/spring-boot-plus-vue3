import request from '@/utils/request';

//操作日志分页列表
export function getSysLogPageApi(data) {
	return request.post({
		url: '/admin/sysLog/getSysLogPage',
		data,
	});
}
//操作日志详情
export function getSysLogApi(id) {
	return request.post({
		url: '/admin/sysLog/getSysLog/' + id,
	});
}
