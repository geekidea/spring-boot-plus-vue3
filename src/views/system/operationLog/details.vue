<template>
	<div v-if="dialogData.isShow">
		<el-dialog :model-value="true" destroy-on-close title="日志详情" @close="closeDialog">
			<div>
				<div class="details-item">
					<div class="label">日志链路ID</div>
					<div class="content">{{ form.traceId }}</div>
				</div>
				<div class="details-item">
					<div class="label">模块名称</div>
					<div class="content">{{ form.moduleName }}</div>
				</div>
				<div class="details-item">
					<div class="label">用户信息</div>
					<div class="content">{{ form.username }} {{ form.requestIp }} {{ form.ipAreaDesc }}</div>
				</div>
				<div class="details-item">
					<div class="label">请求路径</div>
					<div class="content">{{ form.requestMethod }} {{ form.requestUrl }}</div>
				</div>
				<div class="details-item">
					<div class="label">请求参数</div>
					<div class="content">{{ form.requestParam }}</div>
				</div>
				<div class="details-item">
					<div class="label">日志名称</div>
					<div class="content">{{ form.logName }}</div>
				</div>
				<div class="details-item">
					<div class="label">日志类型</div>
					<div class="content">{{ system_status.logType[form.logType]?.label }}</div>
				</div>
				<div class="details-item">
					<div class="label">响应信息</div>
					<div class="content">
						<custom-tag :type="system_status.responseSuccess[form.responseSuccess]?.type">
							{{ system_status.responseSuccess[form.responseSuccess]?.label }}
						</custom-tag>
						{{ form.responseCode }} {{ form.responseMessage }}
					</div>
				</div>
				<div class="details-item">
					<div class="label">用户环境</div>
					<div class="content">{{ system_status.isMobile[form.isMobile]?.label }} {{ form.platformName }} {{ form.browserName }}</div>
				</div>
				<div class="details-item">
					<div class="label">请求时间</div>
					<div class="content">{{ form.requestTime }} ~ {{ form.responseTime }}</div>
				</div>
				<div class="details-item">
					<div class="label">请求耗时</div>
					<div class="content">{{ form.diffTimeDesc }}</div>
				</div>
				<div v-if="form.exceptionName" class="details-item">
					<div class="label">异常类</div>
					<div class="content">{{ form.exceptionName }}</div>
				</div>
				<div v-if="form.exceptionMessage" class="details-item">
					<div class="label">异常信息</div>
					<div class="content">
						<el-input v-model="form.exceptionMessage" :autosize="{ minRows: 2, maxRows: 15 }" type="textarea" disabled />
					</div>
				</div>
			</div>
			<template #footer>
				<div class="dialog-footer">
					<el-button type="primary" @click="submit">确定</el-button>
					<el-button @click="closeDialog">取消</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { getSysLogApi } from '@/api/log';
import { system_status } from '@/utils/status';
import { reactive, ref } from 'vue';

// 表单
let form = ref({});

// 获取详情
const getDetails = (id) => {
	getSysLogApi(id).then((res) => {
		form.value = Object.assign({}, form.value, res);
	});
};
// 弹框数据
const dialogData = reactive({
	isShow: false,
	title: '操作日志详情',
	id: null,
});
// 打开弹框
const openDialog = async (row) => {
	dialogData.isShow = true;
	if (row?.id) {
		getDetails(row.id);
	}
};
// 关闭弹框
const closeDialog = () => {
	dialogData.isShow = false;
	dialogData.id = null;
	form.value = {};
};
// 提交
const submit = async () => {
	closeDialog();
};

defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped>
.label {
	flex: 0 0 100px;
	padding: 10px;
	border-right: 1px solid #eee;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.details-item {
	width: 100%;
	display: flex;
	border: 1px solid #eee;
	border-bottom: none;

	&:last-child {
		border-bottom: 1px solid #eee;
	}
}

.content {
	flex: auto;
	padding: 10px;
	word-break: break-all;
}
</style>
