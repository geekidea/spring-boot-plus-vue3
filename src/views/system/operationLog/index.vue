<template>
	<el-card shadow="never" class="card-box">
		<!--    查询-->
		<el-form :model="queryForm" label-width="90px">
			<el-row :gutter="20">
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="模块名称">
						<el-input v-model="queryForm.moduleName" placeholder="请输入模块名称" clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="请求路径">
						<el-input v-model="queryForm.requestUrl" placeholder="请输入请求路径" clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="日志名称">
						<el-input v-model="queryForm.logName" placeholder="请输入日志名称" clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="操作人">
						<el-input v-model="queryForm.username" placeholder="请输入操作人" clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="日志类型">
						<el-select v-model="queryForm.logType" placeholder="请选择日志类型" clearable>
							<el-option v-for="(item, index) in system_status.logType" :key="index" :label="item.label" :value="index" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="响应状态">
						<el-select v-model="queryForm.responseSuccess" placeholder="请选择响应状态" clearable>
							<el-option label="成功" :value="true" />
							<el-option label="失败" :value="false" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="请求人IP">
						<el-input v-model="queryForm.requestIp" placeholder="请输入请求人IP" clearable />
					</el-form-item>
				</el-col>
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="创建时间">
						<date-picker
							type="daterange"
							v-model:startDate="queryForm.createStartTime"
							v-model:endDate="queryForm.createEndTime"
							clearable
							start-placeholder="开始时间"
							end-placeholder="结束时间"
						/>
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
		<!--    表格-->
		<el-table v-loading="tableLoading.status" :data="tableData.data" border style="width: 100%" row-key="id" @sort-change="sortChange">
			<el-table-column prop="_tableIndex" label="序号" align="center" width="60px" />
			<el-table-column prop="moduleName" label="模块名称" align="center" />
			<el-table-column prop="logName" label="日志名称" width="230">
				<template #default="{ row }">
					<el-tooltip :content="`${row.requestMethod} ${row.requestUrl}`">
						<span>{{ row.logName }}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="logType" label="日志类型" align="center">
				<template #default="{ row }">
					<span>{{ system_status.logType[row.logType].label }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="responseSuccess" label="响应状态" align="center">
				<template #default="{ row }">
					<custom-tag :type="system_status.responseSuccess[row.responseSuccess].type">
						{{ system_status.responseSuccess[row.responseSuccess].label }}
					</custom-tag>
				</template>
			</el-table-column>
			<el-table-column prop="username" label="操作人" align="center" />
			<el-table-column prop="requestIp" label="请求IP" align="center" width="150">
				<template #default="{ row }">
					<el-tooltip :content="row.requestMethod">
						<span>{{ row.requestIp }}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="diffTimeDesc" label="耗时" align="center" sortable="custom" />
			<el-table-column prop="createTime" label="创建时间" align="center" sortable="custom" width="180" />
			<el-table-column label="操作" fixed="right" align="center">
				<template #default="{ row }">
					<el-button link type="primary" @click="openDialog(row)"> 详情 </el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--    分页-->
		<Pagination v-model:currentPage="pageData.pageIndex" v-model:pageSize="pageData.pageSize" :total="pageData.total" @changePage="changePage" />
		<!--    详情弹框-->
		<Details ref="detailsDialogRef" />
	</el-card>
</template>
<script setup>
import { getSysLogPageApi } from '@/api/log';
import { system_status } from '@/utils/status';
import Details from './details.vue';
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

/** 表格*/
// 表格数据
const tableData = reactive({
	data: [],
});
// 获取表格列表
const getTableList = () => {
	tableLoading.value.status = true;
	getSysLogPageApi({ ...pageData, ...queryForm.value, ...orderBy.value }).then((res) => {
		tableData.data = calcTableIndex(res, pageData);
		pageData.total = res.total;
		tableLoading.value.status = false;
	});
};
/** 排序*/
const orderBy = ref({});
// 排序
const sortChange = ({ prop, order }) => {
	if (order) {
		if (prop === 'diffTimeDesc') {
			orderBy.value.orderByColumn = 'diffTime';
		} else {
			orderBy.value.orderByColumn = prop;
		}
		orderBy.value.orderByAsc = order === 'ascending';
	} else {
		orderBy.value = {};
	}

	pageData.pageIndex = 1;
	getTableList();
};

/** 添加，编辑*/
const detailsDialogRef = ref();
// 打开弹框
const openDialog = async (row) => {
	await detailsDialogRef.value.openDialog(row);
};

getTableList();
</script>
<style lang="scss" scoped></style>
