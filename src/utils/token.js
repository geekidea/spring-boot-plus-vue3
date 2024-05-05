import Cookies from 'js-cookie';

export const TokenKey = 'accessToken';

/** 获取`token` */
export function getToken() {
	return Cookies.get(TokenKey);
}

/**
 * @description 设置`token`以及过期时间
 * @param {string} token `token信息`
 * @param {number} expires 过期时间:毫秒ms
 */
export function setToken(token, expires) {
	expires > 0
		? Cookies.set(TokenKey, token, {
				expires: expires / (1000 * 60 * 60 * 24),
			})
		: Cookies.set(TokenKey, token);
}

/** 删除`token` */
export function removeToken() {
	Cookies.remove(TokenKey);
}
