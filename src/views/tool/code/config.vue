<template>
	<el-card shadow="never">
		<el-form :model="form" ref="formRef" :rules="rules" label-width="160px">
			<el-tabs v-model="state.activeName">
				<el-tab-pane label="生成配置" name="1">
					<el-row>
						<el-col :span="12">
							<el-form-item label="表名称" prop="tableName">
								<el-input disabled v-model="form.tableName" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item prop="tableComment">
								<template #label>
									<div class="label-tip flex items-center">
										表注释
										<el-tooltip content="会自动去掉数据库表注释中最后一个字：表" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-input v-model="form.tableComment" placeholder="请输入表注释" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="类名称" prop="className">
								<el-input v-model="form.className" placeholder="请输入类名称" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item prop="parentMenuId">
								<template #label>
									<div class="label-tip flex items-center">
										上级菜单
										<el-tooltip content="配置父菜单，如果未选择，默认为根菜单，例如选择：系统管理" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<tree-select v-model:value="form.parentMenuId" :options="state.menuList" placeholder="请选择上级菜单" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="包名称" prop="packageName">
								<el-input v-model="form.packageName" placeholder="请输入包名称" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item prop="idType">
								<template #label>
									<div class="label-tip flex items-center">
										主键策略
										<el-tooltip content="配置主键ID生成策略，默认为ASSIGN_ID15位雪花算法ID，对应mybatisplus主键生成策略" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-select v-model="form.idType" placeholder="请选择生成ID类型">
									<el-option label="AUTO" value="AUTO" />
									<el-option label="NONE" value="NONE" />
									<el-option label="INPUT" value="INPUT" />
									<el-option label="ASSIGN_ID" value="ASSIGN_ID" />
									<el-option label="ASSIGN_UUID" value="ASSIGN_UUID" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="模块名称" prop="moduleName">
								<el-input v-model="form.moduleName" placeholder="请输入模块名称" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item prop="requestMappingStyle">
								<template #label>
									<div class="label-tip flex items-center">
										请求映射风格
										<el-tooltip content="controller请求路径风格，默认为全名称路径，也可选择如restful风格等" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-select v-model="form.requestMappingStyle" clearable placeholder="请选择请求映射风格">
									<el-option label="默认" :value="1" />
									<el-option label="restful" :value="2" />
									<el-option label="全部小写" :value="3" />
									<el-option label="中横线" :value="4" />
									<el-option label="下划线" :value="5" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="作者" prop="author">
								<el-input v-model="form.author" placeholder="请输入作者" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item prop="defaultOrderColumnName">
								<template #label>
									<div class="label-tip flex items-center">
										默认降序排列
										<el-tooltip content="后台分页列表默认降序排列字段，默认为id降序，可输入如：create_time、update_time等" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-input v-model="form.defaultOrderColumnName" placeholder="如id、create_time，如果为空，则不指定默认排序" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item prop="generatorBackend">
								<template #label>
									<div class="label-tip flex items-center">
										生成管理后端
										<el-tooltip content="是否生成管理后台代码，默认生成，如选择否，则不会生成后端Java代码和菜单SQL" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-radio-group v-model="form.generatorBackend">
									<el-radio :value="true" border>是</el-radio>
									<el-radio :value="false" border>否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item prop="validateField">
								<template #label>
									<div class="label-tip flex items-center">
										校验字段注解
										<el-tooltip
											content="后台dto类和前端表单提交的字段是否自动根据数据库非空策略，自动添加如：@NotNull、@NotBlank、@Length的校验字段"
											placement="top"
										>
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-radio-group v-model="form.validateField">
									<el-radio :value="true" border>是</el-radio>
									<el-radio :value="false" border>否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item prop="generatorAppBackend">
								<template #label>
									<div class="label-tip flex items-center">
										生成App后端
										<el-tooltip content="生成App后端的前提是生成后端选择是，默认生成，如不生成App接口代码，则选择否" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-radio-group v-model="form.generatorAppBackend">
									<el-radio :value="true" border>是</el-radio>
									<el-radio :value="false" border>否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item prop="enableLog">
								<template #label>
									<div class="label-tip flex items-center">
										启用日志注解
										<el-tooltip content="是否在controller的增删改方法上添加@Log注解" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-radio-group v-model="form.enableLog">
									<el-radio :value="true" border>是</el-radio>
									<el-radio :value="false" border>否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item prop="generatorFrontend">
								<template #label>
									<div class="label-tip items-center">
										生成前端
										<el-tooltip content="是否生成前端代码，默认生成，如选择否，则不会生成前端代码" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-radio-group v-model="form.generatorFrontend">
									<el-radio :value="true" border>是</el-radio>
									<el-radio :value="false" border>否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item prop="enablePermission">
								<template #label>
									<div class="label-tip flex items-center">
										启用权限编码
										<el-tooltip content="是否在controller方法上添加@Permission权限编码注解，默认添加，如选择否，则不添加" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-radio-group v-model="form.enablePermission">
									<el-radio :value="true" border>是</el-radio>
									<el-radio :value="false" border>否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item prop="formLayout">
								<template #label>
									<div class="label-tip flex items-center">
										表单布局
										<el-tooltip content="前端添加和修改表单的布局样式，默认为一行两列" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-select v-model="form.formLayout" placeholder="请选择表单布局">
									<el-option label="一行一列" :value="1" />
									<el-option label="一行两列" :value="2" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item prop="generatorType">
								<template #label>
									<div class="label-tip flex items-center">
										生成方式
										<el-tooltip content="默认为下载zip文件，可修改为自定义路径，需要指定绝对路径，如不指定，默认为当前项目路径下" placement="top">
											<el-icon>
												<ele-question-filled />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
								<el-select v-model="form.generatorType" placeholder="请选择生成方式">
									<el-option label="zip压缩包" :value="1" />
									<el-option label="自定义路径" :value="2" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<template v-if="form.generatorType === 2">
						<el-row>
							<el-col>
								<el-form-item prop="customBackendPath">
									<template #label>
										<div class="label-tip flex items-center">
											后端生成路径
											<el-tooltip content="默认为当前项目路径下，如需自定义，则指定绝对路径" placement="top">
												<el-icon>
													<ele-question-filled />
												</el-icon>
											</el-tooltip>
										</div>
									</template>
									<el-input v-model="form.customBackendPath" placeholder="请输入后端生成路径" />
								</el-form-item>
							</el-col>
							<el-col>
								<el-form-item prop="customFrontendPath">
									<template #label>
										<div class="label-tip flex items-center">
											前端生成路径
											<el-tooltip content="默认为当前项目路径下的vue目录，如需自定义，则指定绝对路径" placement="top">
												<el-icon>
													<ele-question-filled />
												</el-icon>
											</el-tooltip>
										</div>
									</template>
									<el-input v-model="form.customFrontendPath" placeholder="请输入前端生成路径" />
								</el-form-item>
							</el-col>
						</el-row>
					</template>
				</el-tab-pane>
				<el-tab-pane label="字段信息" name="2">
					<el-table :data="form.columns" border>
						<el-table-column type="index" label="序号" width="50" align="center" />
						<el-table-column prop="columnName" min-width="110" label="字段名" />
						<el-table-column prop="columnCustomComment" min-width="150" label="字段描述">
							<template #default="{ row }">
								<el-input v-model="row.columnCustomComment" />
							</template>
						</el-table-column>
						<el-table-column prop="columnType" min-width="105" label="字段类型" />
						<el-table-column prop="propertyName" min-width="110" label="属性名称" />
						<el-table-column prop="propertyType" min-width="90" label="属性类型" />
						<el-table-column prop="isForm" min-width="45" label="表单" align="center">
							<template #default="{ row }">
								<el-checkbox v-model="row.isForm" />
							</template>
						</el-table-column>
						<el-table-column prop="isList" min-width="45" label="列表" align="center">
							<template #default="{ row }">
								<el-checkbox v-model="row.isList" />
							</template>
						</el-table-column>
						<el-table-column prop="isQuery" min-width="45" label="查询" align="center">
							<template #default="{ row }">
								<el-checkbox v-model="row.isQuery" />
							</template>
						</el-table-column>
						<el-table-column prop="isRequired" min-width="45" label="必填" align="center">
							<template #default="{ row }">
								<el-checkbox v-model="row.isRequired" />
							</template>
						</el-table-column>
						<el-table-column prop="queryType" min-width="102" label="查询方式" align="center">
							<template #default="{ row }">
								<el-select v-model="row.queryType" placeholder="请选择查询方式">
									<el-option label="=" :value="1" />
									<el-option label="!=" :value="2" />
									<el-option label=">" :value="3" />
									<el-option label=">=" :value="4" />
									<el-option label="<" :value="5" />
									<el-option label="<=" :value="6" />
									<el-option label="like" :value="7" />
									<el-option label="日期范围" :value="8" />
									<el-option label="日期时间范围" :value="9" />
								</el-select>
							</template>
						</el-table-column>
						<el-table-column prop="formType" min-width="116" label="表单类型" align="center">
							<template #default="{ row }">
								<el-select v-model="row.formType" clearable placeholder="请选择表单类型">
									<el-option label="单行文本" :value="1" />
									<el-option label="多行文本" :value="2" />
									<el-option label="数字框" :value="3" />
									<el-option label="单选框" :value="4" />
									<el-option label="复选框" :value="5" />
									<el-option label="下拉框" :value="6" />
									<el-option label="日期" :value="7" />
									<el-option label="日期时间" :value="8" />
									<el-option label="时间" :value="9" />
									<el-option label="文件上传" :value="10" />
									<el-option label="富文本" :value="11" />
								</el-select>
							</template>
						</el-table-column>
						<el-table-column prop="dictType" min-width="110" label="字典类型" align="center">
							<template #default="{ row }">
								<el-select v-model="row.dictType" clearable placeholder="请选择">
									<el-option v-for="item in state.dictTypeList" :key="item.id" :label="item.name" :value="item.code" />
								</el-select>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
			<div class="flex-center mt-3">
				<el-button type="primary" @click="submit">提交</el-button>
				<el-button class="ml10" @click="cancel">返回</el-button>
			</div>
		</el-form>
	</el-card>
</template>

<script setup>
import { getGeneratorTableApi, updateGeneratorTableApi } from '@/api/code';
import { getAllSysMenuTreeListApi } from '@/api/menu';
import { getSysDictTypeListApi } from '@/api/dict';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const formRef = ref();

const state = reactive({
	activeName: '1',
	menuList: [],
	dictList: [],
});

const form = ref({});

// 效验规则
const rules = reactive({
	tableName: [{ required: true, message: '请输入表名称', trigger: 'blur' }],
	tableComment: [{ required: true, message: '请输入表注释', trigger: 'blur' }],
	className: [{ required: true, message: '请输入类名称', trigger: 'blur' }],
	moduleName: [{ required: true, message: '请输入模块名称', trigger: 'blur' }],
	packageName: [{ required: true, message: '请输入包名称', trigger: 'blur' }],
	author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
	idType: [{ required: true, message: '请选择生成ID类型枚举', trigger: 'change' }],
	requestMappingStyle: [{ required: true, message: '请选择请求映射风格举', trigger: 'change' }],
});

// 获取详情信息
const getGeneratorTable = async () => {
	const res = await getGeneratorTableApi(route.query.tableName);
	form.value = Object.assign({}, form.value, res);
	if (!form.value.idType) form.value.idType = 'ASSIGN_ID';
	if (form.value.parentMenuId) {
		form.value.parentMenuId = parseInt(form.value.parentMenuId);
	}
	if (!form.value.parentMenuId) form.value.parentMenuId = 0;
	if (!form.value.requestMappingStyle) form.value.requestMappingStyle = 1;
};

// 获取所有菜单
const getTableList = () => {
	getAllSysMenuTreeListApi({}).then((res) => {
		state.menuList = [
			{
				id: 0,
				name: '根菜单',
				children: res || [],
			},
		];
	});
};
// 获取字典数据
const getSysDictTypeList = async () => {
	state.dictTypeList = (await getSysDictTypeListApi({ pageSize: 9999 })) || [];
};

// 提交
const submit = async () => {
	if (!formRef.value) return;
	const valid = await formRef.value.validate().catch(() => {});
	if (!valid) return false;
	await updateGeneratorTableApi(form.value);
	ElMessage.success('生成成功');
	router.back();
};

const cancel = () => {
	router.back();
};

getTableList();
getSysDictTypeList();
getGeneratorTable();
</script>

<style scoped>
.label-tip .el-icon {
	opacity: 0.6;
	margin-left: 2px;
}
</style>
