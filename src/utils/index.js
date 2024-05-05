/**
 * 时间问候语
 * @param param 当前时间，new Date() 格式
 * @description param 调用 `formatAxis(new Date())` 输出 `上午好`
 * @returns string
 */
export function formatGreet(param) {
	let hour = new Date(param).getHours();
	if (hour > 22) return '夜里好';
	else if (hour > 19) return '晚上好';
	else if (hour > 17) return '傍晚好';
	else if (hour > 14) return '下午好';
	else if (hour > 12) return '中午好';
	else if (hour > 9) return '上午好';
	else if (hour > 7) return '早上好';
	else if (hour > 5) return '凌晨好';
	else return '夜里好';
}

/**
 * 计算table序号
 * @param res
 * @param pagination
 */
export function calcTableIndex(res, pagination) {
	return (res.list || []).map((p, i) => {
		p._tableIndex = 1 + i + (pagination.pageIndex - 1) * pagination.pageSize;
		return p;
	});
}
