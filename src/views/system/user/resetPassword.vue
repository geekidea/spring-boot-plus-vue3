<template>
	<el-dialog width="400px" :model-value="pswData.isShow" destroy-on-close title="重置密码" @closed="closePswDialog">
		<el-form :model="pswData" ref="pswFormRef" :rules="pswRules" label-width="90px">
			<el-row>
				<el-col>
					<el-form-item label="用户名">
						<el-input v-model="pswData.row.username" disabled />
					</el-form-item>
				</el-col>
				<el-col>
					<el-form-item label="昵称">
						<el-input v-model="pswData.row.nickname" disabled />
					</el-form-item>
				</el-col>
				<el-col>
					<el-form-item label="新密码" prop="password">
						<el-input v-model="pswData.password" show-password type="password" placeholder="请输入新密码" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button type="primary" @click="resetPsw">确定</el-button>
				<el-button @click="closePswDialog">取消</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import md5 from 'js-md5';
import { resetSysUserPasswordApi } from '@/api/user';
import { ref, reactive } from 'vue';

const pswFormRef = ref();
let pswData = reactive({
	isShow: false,
	row: {},
	password: '',
});
// 效验规则
const pswRules = reactive({
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 12, message: '密码长度应为6到12位', trigger: 'blur' },
	],
});
// 打开授权弹框
const openPswDialog = (row) => {
	if (row?.id) {
		pswData.row = row;
		pswData.isShow = true;
	}
};
// 关闭授权弹框
const closePswDialog = () => {
	pswData.isShow = false;
	pswData.row = {};
	pswData.password = '';
};
// 提交
const resetPsw = async () => {
	if (!pswFormRef.value) return;
	await pswFormRef.value.validate((valid) => {
		if (valid) {
			let params = {
				userId: pswData.row.id,
				password: md5(pswData.password),
			};
			resetSysUserPasswordApi(params).then(() => {
				ElMessage.success('重置成功');
				closePswDialog();
			});
		}
	});
};

defineExpose({
	openPswDialog,
});
</script>

<style scoped></style>
