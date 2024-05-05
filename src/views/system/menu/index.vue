<template>
	<el-card shadow="never" class="card-box">
		<el-form :model="queryForm" label-width="90px">
			<el-row :gutter="20">
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="类型">
						<el-select v-model="queryForm.type" clearable placeholder="请选择菜单类型">
							<el-option label="目录" :value="1" />
							<el-option label="菜单" :value="2" />
							<el-option label="权限" :value="3" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="状态">
						<el-select v-model="queryForm.status" clearable placeholder="请选择状态">
							<el-option label="启用" :value="1" />
							<el-option label="禁用" :value="0" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="是否显示">
						<el-select v-model="queryForm.isShow" clearable placeholder="请选择是否显示">
							<el-option label="是" :value="1" />
							<el-option label="否" :value="0" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="搜索">
						<el-input v-model="queryForm.keyword" @keyup.enter="onSearch" clearable placeholder="请输入菜单名称/路由地址/权限编码等" />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label-width="0">
						<el-button type="primary" @click="onSearch">
							<el-icon>
								<ele-search />
							</el-icon>
							<span class="search-btn__left">查询</span>
						</el-button>
						<el-button @click="onReset">
							<el-icon>
								<ele-refresh />
							</el-icon>
							<span class="search-btn__left">重置</span>
						</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--    新 增-->
		<div class="table-btn-box mb-3">
			<el-button type="primary" @click="openDialog">
				<el-icon class="mr-1">
					<ele-circle-plus />
				</el-icon>
				新 增
			</el-button>
			<el-button @click="tableData.isExpand = !tableData.isExpand">
				<el-icon class="mr-1">
					<ele-expand />
				</el-icon>
				展开/折叠
			</el-button>
		</div>
		<!--    表格-->
		<el-table
			v-loading="tableData.isLoading"
			:data="tableData.data"
			border
			row-key="id"
			:expand-row-keys="tableData.isExpand ? tableData.data.map((item) => item.id) : []"
		>
			<el-table-column prop="name" label="菜单名称" min-width="220">
				<template #default="scope">
					<div class="inline-flex items-center">
						<SvgIcon :name="scope.row.icon" />
						<span class="ml-0.5">{{ scope.row.name }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="routeUrl" label="路由地址" align="left" min-width="170" />
			<el-table-column prop="componentPath" label="组件路径" align="left" min-width="190" />
			<el-table-column prop="code" label="权限标识" align="left" min-width="190" />
			<el-table-column prop="type" label="类型" align="center" min-width="80">
				<template #default="scope">
					<el-tag v-if="scope.row.type === 1" disable-transitions>目录</el-tag>
					<el-tag v-else-if="scope.row.type === 2" type="success" disable-transitions>菜单</el-tag>
					<el-tag v-else type="warning" disable-transitions>权限</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="状态" align="center" min-width="80">
				<template #default="scope">
					<el-tag v-if="scope.row.status === true" type="success" disable-transitions>启用</el-tag>
					<el-tag v-else type="danger" disable-transitions>禁用</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="sort" label="排序" align="center" min-width="66" />
			<el-table-column label="操作" fixed="right" align="center" min-width="200">
				<template #default="{ row }">
					<el-button link type="primary" @click="openAddDialog(row)">
						<el-icon>
							<ele-circle-plus />
						</el-icon>
						新增
					</el-button>
					<el-button link type="primary" @click="openDialog(row)">
						<el-icon>
							<ele-edit />
						</el-icon>
						修改
					</el-button>
					<el-button link type="primary" @click="delTable(row)">
						<el-icon>
							<ele-delete />
						</el-icon>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--    添加，编辑弹框-->
		<TableForm ref="tableDialogRef" @refresh="getTableList" />
	</el-card>
</template>
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { deleteSysMenuApi, getAllSysMenuTreeListApi } from '@/api/menu';
import TableForm from './form.vue';
import { reactive, ref } from 'vue';

/** 查询*/
let queryForm = ref({});

// 查询
const onSearch = () => {
	getTableList();
};
// 查询
const onReset = () => {
	queryForm.value = {};
	getTableList();
};

/** 表格*/
// 表格数据
const tableData = reactive({
	data: [],
	isLoading: false,
	isExpand: true,
});

// 获取表格列表
const getTableList = async () => {
	tableData.isLoading = true;
	try {
		tableData.data = await getAllSysMenuTreeListApi({ ...queryForm.value });
	} finally {
		tableData.isLoading = false;
	}
};
/** 删除*/
const delTable = (row) => {
	ElMessageBox.confirm('是否确认删除本条数据？', '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			deleteSysMenuApi(row.id).then(() => {
				ElMessage.success('删除成功');
				getTableList();
			});
		})
		.catch(() => {});
};

/** 添加，编辑*/
const tableDialogRef = ref();
// 打开弹框
const openDialog = async (row) => {
	await tableDialogRef.value.openDialog(row);
};
const openAddDialog = async (row) => {
	let nextType;
	let nextParentId;
	if (row.type === 1) {
		nextType = 2;
		nextParentId = row.id;
	} else if (row.type === 2) {
		nextType = 3;
		nextParentId = row.id;
	} else {
		nextType = 3;
		nextParentId = row.parentId;
	}
	let addRow = {
		type: nextType,
		parentId: nextParentId,
	};
	await tableDialogRef.value.openDialog(addRow);
};

getTableList();
</script>
