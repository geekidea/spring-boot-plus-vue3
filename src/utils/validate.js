/** 邮箱验证 */
export function validateEmail(rule, value, callback) {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	if (value && !emailRegex.test(value)) {
		callback(new Error('请输入正确的邮箱格式'));
	} else {
		callback();
	}
}

/** 手机号验证 */
export function validatePhoneNumber(rule, value, callback) {
	const phoneRegex = /^1[3456789]\d{9}$/;
	if (value && !phoneRegex.test(value)) {
		callback(new Error('请输入正确的手机号格式'));
	} else {
		callback();
	}
}
