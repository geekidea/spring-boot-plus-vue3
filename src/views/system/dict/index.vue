<template>
	<div>
		<el-row :gutter="5">
			<!--      字典类型-->
			<el-col :span="6">
				<el-card shadow="never">
					<!--       新增-->
					<el-button type="primary" @click="openDictTypeDialog">
						<el-icon class="mr-2">
							<ele-circle-plus />
						</el-icon>
						新 增
					</el-button>
					<!--       类型搜索-->
					<el-input
						v-model="dictTypeData.params.keyword"
						clearable
						@clear="getSysDictTypeList"
						@change="getSysDictTypeList"
						class="mt-3"
						placeholder="输入字典类型名称搜索"
					>
						<template #prefix>
							<el-icon>
								<ele-search />
							</el-icon>
						</template>
					</el-input>
					<!--        字典类型列表-->
					<div class="dict-type-list mt-3 mb-3">
						<template v-if="dictTypeData.data.length > 0">
							<div
								v-for="item in dictTypeData.data"
								:key="item.id"
								:class="tableData.params?.dictCode === item.id ? 'selected' : ''"
								class="dict-type-item justify-between flex"
								@click="pickDictType(item.code)"
							>
								<span>{{ item.name }}</span>
								<span class="color-info font12">{{ item.code }}</span>
								<div v-if="item.isSystem" class="dict-type-operation">
									<el-tooltip content="系统字典类型，无法修改" placement="top">
										<el-button size="small" disabled @click="openDictTypeDialog(item)">
											<el-icon>
												<ele-edit />
											</el-icon>
										</el-button>
									</el-tooltip>
									<el-tooltip content="系统字典类型，无法删除" placement="top">
										<el-button size="small" disabled @click="delDictType(item)">
											<el-icon>
												<ele-delete />
											</el-icon>
										</el-button>
									</el-tooltip>
								</div>
								<div v-else class="dict-type-operation">
									<el-button size="small" @click="openDictTypeDialog(item)">
										<el-icon>
											<ele-edit />
										</el-icon>
									</el-button>
									<el-button size="small" @click="delDictType(item)">
										<el-icon>
											<ele-delete />
										</el-icon>
									</el-button>
								</div>
							</div>
						</template>
						<div v-else class="color-info font12 mt-5 flex items-center justify-center">暂无数据</div>
					</div>
				</el-card>
			</el-col>
			<!--    字典数据  -->
			<el-col :span="18">
				<el-card shadow="never">
					<!--       新增-->
					<el-button v-if="tableData.params?.dictCode && tableData.params?.dictCode !== '0'" type="primary" @click="openDictDialog" class="mb-3">
						<el-icon class="mr-2">
							<ele-circle-plus />
						</el-icon>
						新 增
					</el-button>
					<!--    表格-->
					<el-table v-loading="tableData.isLoading" :data="tableData.data" border style="width: 100%" row-key="id">
						<el-table-column prop="_tableIndex" label="序号" align="center" width="60px" />
						<el-table-column prop="dictCode" label="类型" align="center" width="150" />
						<el-table-column prop="label" label="名称" align="center" />
						<el-table-column prop="value" label="数据值" align="center" />
						<el-table-column prop="sort" label="排序" align="center" />
						<el-table-column prop="remark" label="备注" align="center" />
						<el-table-column prop="status" label="状态" align="center">
							<template #default="scope">
								<el-tag v-if="scope.row.status" type="success" disable-transitions>启用</el-tag>
								<el-tag v-else type="danger" disable-transitions>禁用</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="createTime" label="创建时间" align="center" width="180" />
						<el-table-column label="操作" fixed="right" align="center" width="140">
							<template #default="{ row }">
								<el-button link type="primary" @click="openDictDialog(row)">
									<el-icon><ele-edit /></el-icon>修改
								</el-button>
								<el-button link type="primary" @click="delTable(row)">
									<el-icon><ele-delete /></el-icon>删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<Pagination :total="pageData.total" :currentPage="pageData.pageIndex" :pageSize="pageData.pageSize" @changePage="changePage" />
				</el-card>
			</el-col>
		</el-row>

		<!--    字典列表：添加，编辑弹框-->
		<DictDialog ref="dictDialogRef" :dictCode="tableData.params?.dictCode" :typeList="dictTypeData.data" @refresh="getTableList" />

		<!--    字典类型：添加，编辑弹框-->
		<DictTypeDialog ref="dictTypeDialogRef" @refresh="getSysDictTypeList" />
	</div>
</template>
<script setup>
import DictTypeDialog from './components/DictTypeDialog.vue';
import DictDialog from './components/DictDialog.vue';
import { getSysDictPageApi, deleteSysDictApi, deleteSysDictTypeApi, getSysDictTypeListApi } from '@/api/dict';
import { reactive, ref } from 'vue';
import { calcTableIndex } from '@/utils';
import { ElMessage, ElMessageBox } from 'element-plus';

/** 分页*/
// 分页数据
const pageData = reactive({
	pageIndex: 1,
	pageSize: 10,
	total: 0,
});
// 翻页
const changePage = (page) => {
	pageData.pageIndex = page;
	getTableList();
};

/** 表格*/
// 表格数据
const tableData = reactive({
	data: [],
	isLoading: false,
	params: {
		dictCode: '',
	},
});
// 获取表格列表
const getTableList = () => {
	tableData.isLoading = true;
	getSysDictPageApi({ ...pageData, ...tableData.params }).then((res) => {
		tableData.data = calcTableIndex(res, pageData);
		pageData.total = res.total;
		tableData.isLoading = false;
	});
};
// 删除
const delTable = (row) => {
	ElMessageBox.confirm('是否确认删除本条数据？', '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			deleteSysDictApi(row.id).then(() => {
				ElMessage.success('删除成功');
				getTableList();
			});
		})
		.catch(() => {});
};

/**
 * 字典列表
 * */
const dictDialogRef = ref();
// 打开字典列表弹框
function openDictDialog(data = {}) {
	dictDialogRef.value.openDialog(data);
}

/**
 * 字典类型
 * */
const dictTypeDialogRef = ref();
// 字典类型数据
const dictTypeData = reactive({
	data: [],
	params: {
		pageSize: 9999,
		keyword: '',
	},
});

// 获取字典类型列表
function getSysDictTypeList() {
	getSysDictTypeListApi(dictTypeData.params).then((res) => {
		dictTypeData.data = res || [];
	});
}

// 打开字典类型弹框
function openDictTypeDialog(data = {}) {
	dictTypeDialogRef.value.openDialog(data);
}

// 删除字典类型
function delDictType(row) {
	ElMessageBox.confirm('是否确认删除本条数据？', '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			deleteSysDictTypeApi(row.id).then(() => {
				ElMessage.success('删除成功');
				getSysDictTypeList();
			});
		})
		.catch(() => {});
}

// 选择字典类型
function pickDictType(code) {
	tableData.params.dictCode = code;
	getTableList();
}

getSysDictTypeList();
</script>
<style lang="scss" scoped>
.dict-type-list {
	height: calc(100vh - 230px);
	overflow-y: auto;

	.dict-type-item {
		cursor: pointer;
		padding: 0 10px;
		height: 30px;
		position: relative;

		&.selected {
			background-color: #eaeefe;
		}

		&:hover {
			background-color: #f5f7fa;

			.dict-type-operation {
				display: flex;
				align-items: center;
			}
		}

		.dict-type-operation {
			position: absolute;
			right: 10px;
			top: 0;
			z-index: 10;
			height: 100%;
			background-color: #f5f7fa;
			display: none;
		}
	}
}
</style>
