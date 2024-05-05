import axios from 'axios';
import qs from 'qs';
import { getToken } from '@/utils/token';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
import { router } from '@/router';

const defaultConfig = {
	timeout: 30000,
	baseURL: import.meta.env.VITE_BASE_URL,
	paramsSerializer: {
		serialize(params) {
			return qs.stringify(params, { allowDots: true });
		},
	},
};

class Service {
	constructor() {
		this.httpInterceptorsRequest();
		this.httpInterceptorsResponse();
	}

	/** Axios实例对象*/
	static axiosInstance = axios.create(defaultConfig);

	/** 请求拦截 */
	httpInterceptorsRequest = () => {
		Service.axiosInstance.interceptors.request.use(
			(config) => {
				const token = getToken();
				if (token) {
					config.headers['Authorization'] = token;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
	};

	/** 响应拦截 */
	httpInterceptorsResponse = () => {
		Service.axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
	};

	// 通用请求
	request = ({ method, url, param, axiosConfig }) => {
		const config = {
			method,
			url,
			...param,
			...axiosConfig,
		};
		return new Promise((resolve, reject) => {
			Service.axiosInstance
				.request(config)
				.then((response) => {
					const { code, data, msg } = response.data;
					if (!code) {
						resolve(response.data);
						return;
					}
					switch (code) {
						case 200:
							resolve(data);
							break;
						case 5001:
							ElMessageBox.close();
							ElMessageBox.confirm('登录已过期或登录信息不存在，请重新登录', '提示', {
								confirmButtonText: '重新登录',
								cancelButtonText: '取消',
								type: 'warning',
							})
								.then(async () => {
									await useUserStore().clear();
									await router.push({
										path: '/login',
										query: {
											redirect: router.currentRoute.value.fullPath,
										},
									});
								})
								.catch(() => {});
							break;
						default:
							ElMessage.error(msg || '网络错误');
							reject(response);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	// 通用get请求
	get = ({ url, params, axiosConfig }) => {
		return this.request({
			method: 'get',
			url,
			param: { params },
			axiosConfig,
		});
	};

	// 通用post请求
	post = ({ url, data, axiosConfig }) => {
		return this.request({
			method: 'post',
			url,
			param: { data },
			axiosConfig,
		});
	};

	// 通用put请求
	put = ({ url, data, axiosConfig }) => {
		return this.request({
			method: 'put',
			url,
			param: { data },
			axiosConfig,
		});
	};
}

export default new Service();
