<template>
	<el-card shadow="never" class="card-box">
		<!--    查询-->
		<el-form :model="queryForm" label-width="80px">
			<el-row :gutter="20">
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="角色">
						<el-select v-model="queryForm.roleId" clearable placeholder="请选择角色">
							<el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
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
					<el-form-item label="创建时间">
						<date-picker
							type="daterange"
							v-model:startDate="queryForm.startCreateTime"
							v-model:endDate="queryForm.endCreateTime"
							clearable
							start-placeholder="开始时间"
							end-placeholder="结束时间"
						/>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="搜索">
						<el-input v-model="queryForm.keyword" clearable placeholder="请输入用户名/昵称/手机号码/邮箱" />
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
		<div v-auth="'sys:user:add'" class="table-btn-box mb-4">
			<el-button type="primary" @click="openDialog">
				<el-icon class="mr-2">
					<ele-circle-plus />
				</el-icon>
				新 增
			</el-button>
		</div>
		<!--    表格-->
		<el-table v-loading="tableLoading.status" :data="tableData.data" border style="width: 100%" row-key="id" @sort-change="sortChange">
			<el-table-column prop="_tableIndex" label="序号" align="center" width="60px" />
			<el-table-column prop="username" label="用户名" align="center" />
			<el-table-column prop="nickname" label="昵称" align="center" />
			<el-table-column prop="roleName" label="角色" align="center">
				<template #default="{ row }">
					<el-tag v-if="row.roleIsSystem">{{ row.roleName }}</el-tag>
					<el-tag v-else type="success">{{ row.roleName }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="phone" label="手机号码" align="center" width="150" />
			<el-table-column prop="email" label="邮箱" align="center" width="180" />
			<el-table-column prop="status" label="状态" align="center">
				<template #default="scope">
					<el-tag v-if="scope.row.status" type="success" disable-transitions>启用</el-tag>
					<el-tag v-else type="danger" disable-transitions>禁用</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" align="center" width="180" sortable="custom" />
			<el-table-column label="操作" fixed="right" align="center" width="222">
				<template #default="{ row }">
					<template v-if="!row.isAdmin">
						<el-button v-auth="'sys:user:update'" link type="primary" @click="openDialog(row)">
							<el-icon>
								<ele-edit />
							</el-icon>
							修改
						</el-button>
						<el-button v-auth="'sys:user:reset-password'" link type="primary" @click="openPswDialog(row)"> 重置密码 </el-button>
						<el-button v-auth="'sys:user:delete'" link type="primary" @click="delTable(row)">
							<el-icon>
								<ele-delete />
							</el-icon>
							删除
						</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<!--    分页-->
		<Pagination v-model:currentPage="pageData.pageIndex" v-model:pageSize="pageData.pageSize" :total="pageData.total" @changePage="changePage" />

		<!--    添加，编辑弹框-->
		<TableForm ref="tableDialogRef" @refresh="getTableList" :roleList="roleList" />

		<!--    重置密码-->
		<ResetPassword ref="passwordDialogRef" />
	</el-card>
</template>
<script setup>
import { deleteSysUserApi, getSysUserPageApi } from '@/api/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import TableForm from './form.vue';
import ResetPassword from './resetPassword.vue';
import { getSysRoleAllListApi } from '@/api/role';
import { calcTableIndex } from '@/utils';
import { ref, reactive } from 'vue';

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

/** 排序*/
const orderBy = ref({});

/** 表格*/
// 表格数据
const tableData = reactive({
	data: [],
});
// 获取表格列表
const getTableList = () => {
	tableLoading.value.status = true;
	getSysUserPageApi({ ...pageData, ...queryForm.value, ...orderBy.value }).then((res) => {
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
			deleteSysUserApi(row.id).then(() => {
				ElMessage.success('删除成功');
				getTableList();
			});
		})
		.catch(() => {});
};
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

/** 角色信息*/
const roleList = ref([]);

// 获取角色数据
const getRoleList = () => {
	return new Promise((resolve) => {
		getSysRoleAllListApi({}).then((res) => {
			roleList.value = res || [];
			resolve(roleList.value);
		});
	});
};

/** 添加，编辑*/
const tableDialogRef = ref();
// 打开弹框
const openDialog = async (row) => {
	await tableDialogRef.value.openDialog(row);
};

/** 重置密码*/
const passwordDialogRef = ref();
// 打开弹框
const openPswDialog = async (row) => {
	await passwordDialogRef.value.openPswDialog(row);
};

getRoleList();
getTableList();
</script>
<style></style>
