<template>
	<div v-if="dialogData.isShow">
		<el-dialog :model-value="true" destroy-on-close :title="dialogData.title" @close="closeDialog">
			<el-form :model="form" ref="formRef" :rules="rules" label-width="90px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="用户名" prop="username">
							<el-input v-model="form.username" :disabled="!!form.id" placeholder="请输入用户名" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="昵称" prop="nickname">
							<el-input v-model="form.nickname" placeholder="请输入昵称" />
						</el-form-item>
					</el-col>
					<el-col v-if="!form.id" :span="12">
						<el-form-item label="密码" prop="password">
							<el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="角色" prop="roleId">
							<el-select v-model="form.roleId" clearable placeholder="请选择角色">
								<el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="form.email" placeholder="请输入邮箱" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="状态">
							<el-radio-group v-model="form.status">
								<el-radio :value="true" border>启用</el-radio>
								<el-radio :value="false" border>禁用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
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
import { ElMessage } from 'element-plus';
import { validateEmail, validatePhoneNumber } from '@/utils/validate';
import { addSysUserApi, getSysUserApi, updateSysUserApi } from '@/api/user';
import md5 from 'js-md5';
import { ref, reactive } from 'vue';

const formRef = ref();

const emits = defineEmits(['refresh']);

defineProps({
	roleList: {
		type: Array,
		default: () => [],
	},
});

// 表单
let form = ref({
	gender: 1,
	status: true,
});
// 效验规则
const rules = reactive({
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 12, message: '密码长度6到20位', trigger: 'blur' },
	],
	phone: [{ validator: validatePhoneNumber, trigger: 'blur' }],
	email: [{ validator: validateEmail, trigger: 'blur' }],
	roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
});
// 获取详情
const getDetails = (id) => {
	getSysUserApi(id).then((res) => {
		form.value = Object.assign({}, form.value, res);
	});
};
// 弹框数据
const dialogData = reactive({
	isShow: false,
	title: '新增用户',
	id: null,
});
// 打开弹框
const openDialog = async (row) => {
	dialogData.isShow = true;
	dialogData.title = '新增用户';
	if (row?.id) {
		dialogData.id = row.id;
		dialogData.title = '编辑用户';
		getDetails(row.id);
	}
};
// 关闭弹框
const closeDialog = () => {
	dialogData.isShow = false;
	dialogData.id = null;
	form.value = {
		gender: 1,
		status: true,
	};
};
// 提交
const submit = async () => {
	if (!formRef.value) return;
	await formRef.value.validate((valid) => {
		if (valid) {
			let data = form.value;
			if (data.id) {
				updateSysUserApi({ ...data }).then(() => {
					ElMessage.success('操作成功');
					closeDialog();
					emits('refresh');
				});
			} else {
				data.password = md5(data.password);
				addSysUserApi({ ...data }).then(() => {
					ElMessage.success('操作成功');
					closeDialog();
					emits('refresh');
				});
			}
		}
	});
};

defineExpose({
	openDialog,
});
</script>

<style scoped></style>
