import request from '@/utils/request';

//单个文件上传
export function uploadApi(data) {
	return request.post({
		url: '/common/upload',
		axiosConfig: {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		},
		data,
	});
}
