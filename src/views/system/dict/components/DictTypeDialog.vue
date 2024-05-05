<template>
	<div v-if="dialogData.isShow">
		<el-dialog width="500px" :model-value="true" destroy-on-close :title="dialogData.title" @close="closeDialog">
			<el-form ref="formRef" :rules="rules" :model="form" label-width="90px">
				<el-row>
					<el-col>
						<el-form-item label="配置类型">
							<el-radio-group v-model="form.isSystem">
								<el-radio :value="true" border>系统类型</el-radio>
								<el-radio :value="false" border>其他类型</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="类型名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入类型名称" />
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="类型编码" prop="code">
							<el-input v-model="form.code" :disabled="!!dialogData.id" placeholder="请输入类型编码" />
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="备注">
							<el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
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
import { getSysDictTypeApi, addSysDictTypeApi, updateSysDictTypeApi } from '@/api/dict';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const formRef = ref();

const emits = defineEmits(['refresh']);

let form = ref({
	isSystem: false,
});

// 效验规则
const rules = {
	name: [{ required: true, message: '请输入类型名称' }],
	code: [{ required: true, message: '请输入类型编码' }],
};
const getDetails = (id) => {
	getSysDictTypeApi(id).then((res) => {
		form.value = Object.assign({}, form.value, res);
	});
};
// 弹框数据
const dialogData = reactive({
	isShow: false,
	title: '新增',
	id: null,
});
// 打开弹框
const openDialog = async (row) => {
	dialogData.isShow = true;
	dialogData.title = '新增';
	if (row?.id) {
		dialogData.id = row.id;
		dialogData.title = '编辑';
		getDetails(row.id);
	}
};
// 关闭弹框
const closeDialog = () => {
	dialogData.isShow = false;
	dialogData.id = null;
	form.value = { isSystem: false };
};

// 提交
const submit = async () => {
	if (!formRef.value) return;
	await formRef.value.validate((valid) => {
		if (valid) {
			if (dialogData.id) {
				updateSysDictTypeApi(form.value).then(() => {
					ElMessage.success('操作成功');
					closeDialog();
					emits('refresh');
				});
			} else {
				addSysDictTypeApi(form.value).then(() => {
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
