<template>
	<div v-if="dialogData.isShow">
		<el-dialog width="500px" :model-value="true" destroy-on-close :title="dialogData.title" @close="closeDialog">
			<el-form ref="formRef" :rules="rules" :model="form" label-width="90px">
				<el-row>
					<el-col>
						<el-form-item label="字典类型">
							<el-select v-model="form.dictCode" disabled>
								<el-option v-for="item in typeList" :key="item.code" :label="item.name" :value="item.code" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="字典名称" prop="label">
							<el-input v-model="form.label" placeholder="请输入字典名称" />
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="字典值" prop="value">
							<el-input v-model="form.value" placeholder="请输入字典值" />
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="排序">
							<el-input v-model="form.sort" type="number" placeholder="请输入排序" />
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="备注">
							<el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
						</el-form-item>
					</el-col>
					<el-col>
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
import { getSysDictApi, addSysDictApi, updateSysDictApi } from '@/api/dict';
import { ElMessage } from 'element-plus';
import { computed, reactive, ref } from 'vue';

const formRef = ref();

const props = defineProps({
	dictCode: {
		type: String,
		default: '',
	},
	typeList: {
		type: Array,
		default: () => [],
	},
});

const emits = defineEmits(['refresh']);

let form = ref({
	status: true,
	dictCode: computed(() => props.dictCode),
});

const getDetails = (id) => {
	getSysDictApi(id).then((res) => {
		form.value = Object.assign({}, form.value, res);
	});
};

// 效验规则
const rules = {
	label: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
	value: [{ required: true, message: '请输入字典值', trigger: 'blur' }],
};

// 提交
const submit = async () => {
	if (!formRef.value) return;
	await formRef.value.validate((valid) => {
		if (valid) {
			if (dialogData.id) {
				updateSysDictApi(form.value).then(() => {
					ElMessage.success('操作成功');
					closeDialog();
					emits('refresh');
				});
			} else {
				addSysDictApi(form.value).then(() => {
					ElMessage.success('操作成功');
					closeDialog();
					emits('refresh');
				});
			}
		}
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
	form.value = {
		status: true,
		dictCode: computed(() => props.dictCode),
	};
};

defineExpose({
	openDialog,
});
</script>

<style scoped></style>
