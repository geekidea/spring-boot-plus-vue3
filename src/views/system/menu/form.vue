<template>
	<div v-if="dialogData.isShow">
		<el-dialog :model-value="true" draggable destroy-on-close :title="dialogData.title" @close="closeDialog" width="600px">
			<el-form ref="formRef" :rules="rules[form.type]" :model="form" :validate-on-rule-change="false" label-width="100px">
				<el-row>
					<el-col :span="24">
						<el-form-item label="类型">
							<el-radio-group v-model="form.type" @change="changeType">
								<el-radio-button v-for="(item, index) in typeOptions" :key="index" :value="item.id">
									{{ item.name }}
								</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="上级菜单">
							<tree-select v-model="form.parentId" :options="menuList" placeholder="请选择上级菜单" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="菜单名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入菜单名称（如：菜单管理）" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item prop="routeUrl" v-if="form.type !== 3">
							<template #label>
								<div class="label-tip align-center">
									路由地址
									<el-tooltip content="前端访问的路由地址，以/开头，每个菜单的路由地址应唯一" placement="top">
										<el-icon>
											<ele-question-filled />
										</el-icon>
									</el-tooltip>
								</div>
							</template>
							<el-input v-model="form.routeUrl" placeholder="请输入路由地址（如：/menu）" />
						</el-form-item>
					</el-col>
					<el-col :span="24" v-if="form.type === 2">
						<el-form-item prop="componentPath">
							<template #label>
								<div class="label-tip align-center">
									组件路径
									<el-tooltip content="前端vue代码中views目录下的文件路径，注意不用以/开头，如：system/user/index" placement="top">
										<el-icon>
											<ele-question-filled />
										</el-icon>
									</el-tooltip>
								</div>
							</template>
							<el-input v-model="form.componentPath" placeholder="请输入组件路径（如：system/menu/index）" />
						</el-form-item>
					</el-col>
					<el-col :span="24" v-if="form.type !== 1">
						<el-form-item prop="code">
							<template #label>
								<div class="label-tip align-center">
									权限标识
									<el-tooltip content="后端权限标识编码，如后端启用权限标识验证，则此处必填，对应后端@Permission中的编码值" placement="top">
										<el-icon>
											<ele-question-filled />
										</el-icon>
									</el-tooltip>
								</div>
							</template>
							<el-input v-model="form.code" placeholder="请输入权限标识（如：sys:user:add）" />
						</el-form-item>
					</el-col>
					<el-col :span="24" v-if="form.type !== 3">
						<el-form-item label="图标">
							<IconSelect v-model="form.icon" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item prop="sort">
							<template #label>
								<div class="label-tip align-center">
									排序
									<el-tooltip content="在左侧导航菜单中显示的顺序，从低到高排序，默认为0" placement="top">
										<el-icon>
											<ele-question-filled />
										</el-icon>
									</el-tooltip>
								</div>
							</template>
							<el-input v-model="form.sort" type="number" placeholder="请输入排序" />
						</el-form-item>
					</el-col>
					<el-col :span="12" v-if="form.type !== 3">
						<el-form-item prop="isShow">
							<template #label>
								<div class="label-tip align-center">
									是否显示
									<el-tooltip content="是否在左侧导航栏菜单展示，默认显示，如选不显示，则只作为后台权限验证" placement="top">
										<el-icon>
											<ele-question-filled />
										</el-icon>
									</el-tooltip>
								</div>
							</template>
							<el-radio-group v-model="form.isShow">
								<el-radio :value="true" border>是</el-radio>
								<el-radio :value="false" border>否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-if="form.type === 2">
						<el-form-item label="是否缓存">
							<el-radio-group v-model="form.isCache">
								<el-radio :value="true" border>是</el-radio>
								<el-radio :value="false" border>否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="24">
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
import { addSysMenuApi, getAllSysMenuTreeListApi, getSysMenuApi, updateSysMenuApi } from '@/api/menu';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import IconSelect from '@/components/iconSelect/index.vue';

const formRef = ref();

const emits = defineEmits(['refresh']);

// 菜单类型
const typeOptions = [
	{
		name: '目录',
		id: 1,
	},
	{
		name: '菜单',
		id: 2,
	},
	{
		name: '权限',
		id: 3,
	},
];
// 表单
let form = ref({
	parentId: 0,
	sort: 0,
	type: 1,
	isCache: false,
	isShow: true,
	status: true,
});
// 效验规则
const rules = {
	1: {
		name: [{ required: true, message: '请输入菜单名称' }],
		routeUrl: [{ required: true, message: '请输入路由地址' }],
	},
	2: {
		name: [{ required: true, message: '请输入菜单名称' }],
		routeUrl: [{ required: true, message: '请输入路由地址' }],
		componentPath: [{ required: true, message: '请输入组件路径' }],
	},
	3: {
		name: [{ required: true, message: '请输入权限名称' }],
		code: [{ required: true, message: '请输入权限标识' }],
	},
};
// 选择类型
const changeType = () => {
	if (formRef.value) formRef.value.resetFields();
};

const menuList = ref([]);
// 获取所有菜单
const getTableList = () => {
	getAllSysMenuTreeListApi({}).then((res) => {
		menuList.value = [
			{
				id: '0',
				name: '根菜单',
				children: res || [],
			},
		];
	});
};

// 获取详情
const getDetails = (id) => {
	getSysMenuApi(id).then((res) => {
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
	dialogData.title = '新增菜单';
	await getTableList();
	let menuParentId = row.parentId;
	if (menuParentId === undefined) {
		menuParentId = '0';
	}
	let menuType = row.type;
	if (menuType !== 2 && menuType !== 3) {
		menuType = 1;
	}
	if (row?.id) {
		dialogData.id = row.id;
		dialogData.title = '编辑菜单';
		getDetails(row.id);
	} else {
		form.value = Object.assign({}, form.value, {
			parentId: menuParentId,
			type: menuType,
		});
	}
};
// 关闭弹框
const closeDialog = () => {
	dialogData.isShow = false;
	dialogData.id = null;
	form.value = {
		parentId: '0',
		sort: 0,
		type: 1,
		isCache: false,
		isShow: true,
		status: true,
	};
};
// 提交
const submit = async () => {
	if (!formRef.value) return;
	await formRef.value.validate((valid) => {
		if (valid) {
			let data = form.value,
				params;
			if (form.value.type === 1) {
				params = {
					type: data.type,
					parentId: data.parentId || 0,
					name: data.name,
					routeUrl: data.routeUrl,
					icon: data.icon,
					sort: data.sort,
					isShow: data.isShow,
					status: data.status,
				};
			} else if (form.value.type === 2) {
				params = {
					type: data.type,
					parentId: data.parentId || 0,
					name: data.name,
					routeUrl: data.routeUrl,
					componentPath: data.componentPath,
					code: data.code,
					icon: data.icon,
					sort: data.sort,
					isShow: data.isShow,
					isCache: data.isCache,
					status: data.status,
				};
			} else {
				params = {
					type: data.type,
					parentId: data.parentId || 0,
					name: data.name,
					code: data.code,
					sort: data.sort,
					status: data.status,
				};
			}
			if (data.id) {
				updateSysMenuApi({ id: data.id, ...params }).then(() => {
					ElMessage.success('操作成功');
					closeDialog();
					emits('refresh');
				});
			} else {
				addSysMenuApi(params).then(() => {
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

<style scoped>
.label-tip .el-icon {
	opacity: 0.6;
	margin-left: 2px;
}
</style>
