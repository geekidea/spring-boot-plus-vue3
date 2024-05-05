<template>
	<el-card shadow="never" class="card-box">
		<!--    查询-->
		<el-form :model="queryForm" label-width="90px">
			<el-row :gutter="20">
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="搜索">
						<el-input v-model="queryForm.keyword" clearable placeholder="请输入角色名称/编码" />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="角色类型">
						<el-select v-model="queryForm.isSystem" clearable placeholder="请选择角色类型">
							<el-option label="系统角色" :value="1" />
							<el-option label="自定义角色" :value="0" />
						</el-select>
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
				<el-icon class="mr5">
					<ele-circle-plus />
				</el-icon>
				新 增
			</el-button>
		</div>
		<!--    表格-->
		<el-table v-loading="tableLoading.status" :data="tableData.data" border style="width: 100%" row-key="id" @sort-change="sortChange">
			<el-table-column prop="_tableIndex" label="序号" align="center" width="60px" />
			<el-table-column prop="name" label="角色名称" align="center" />
			<el-table-column prop="code" label="角色编码" align="center" />
			<el-table-column prop="isSystem" label="角色类型" align="center">
				<template #default="{ row }">
					<el-tag v-if="row.isSystem">系统角色</el-tag>
					<el-tag v-else type="success">自定义角色</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="remark" label="备注" align="center" />
			<el-table-column prop="createTime" label="创建时间" align="center" sortable="custom" />
			<el-table-column label="操作" fixed="right" align="center" width="200">
				<template #default="{ row }">
					<template v-if="row.code !== 'admin'">
						<el-button link type="primary" @click="openDialog(row)">
							<el-icon><ele-edit /></el-icon>修改
						</el-button>
						<el-button link type="primary" @click="openAuthDialog(row)"> 授权 </el-button>
						<el-button v-if="!row.isSystem" link type="primary" @click="delTable(row)">
							<el-icon><ele-delete /></el-icon>删除
						</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<!--    分页-->
		<Pagination v-model:currentPage="pageData.pageIndex" v-model:pageSize="pageData.pageSize" :total="pageData.total" @changePage="changePage" />

		<!--    添加，编辑弹框-->
		<TableForm ref="tableDialogRef" @refresh="getTableList" />

		<!--    授权弹框-->
		<Auth ref="authDialogRef" />
	</el-card>
</template>
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { deleteSysRoleApi, getSysRolePageApi } from '@/api/role';
import TableForm from './form.vue';
import Auth from './auth.vue';
import { calcTableIndex } from '@/utils';
import { reactive, ref } from 'vue';

/** 查询*/
let queryForm = ref({});

const tableLoading = ref({
	status: false,
});

// 查询
const onSearch = () => {
	pageData.pageIndex = 1;
	getTableList();
};
// 重置
const onReset = () => {
	queryForm.value = {};
	pageData.pageIndex = 1;
	getTableList();
};

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
});

// 获取表格列表
const getTableList = () => {
	tableLoading.value.status = true;
	getSysRolePageApi({ ...pageData, ...queryForm.value, ...orderBy.value }).then((res) => {
		tableData.data = calcTableIndex(res, pageData);
		pageData.total = res.total;
		tableLoading.value.status = false;
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
			deleteSysRoleApi(row.id).then(() => {
				ElMessage.success('删除成功');
				getTableList();
			});
		})
		.catch(() => {});
};

/** 排序*/
const orderBy = ref({});
// 排序
const sortChange = ({ prop, order }) => {
	if (order) {
		orderBy.value.orderByColumn = prop;
		orderBy.value.orderByAsc = order === 'ascending';
	} else {
		orderBy.value = {};
	}

	pageData.pageIndex = 1;
	getTableList();
};

/** 添加，编辑*/
const tableDialogRef = ref();
// 打开弹框
const openDialog = async (row) => {
	await tableDialogRef.value.openDialog(row);
};

/** 授权*/
const authDialogRef = ref();
// 打开弹框
const openAuthDialog = async (row) => {
	await authDialogRef.value.openAuthDialog(row);
};

getTableList();
</script>
<style></style>
