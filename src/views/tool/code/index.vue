<template>
	<el-card shadow="never" class="card-box">
		<!--    查询-->
		<el-form :model="queryForm" label-width="80px">
			<el-row :gutter="20">
				<el-col :sm="24" :md="12" :lg="8" :xl="6">
					<el-form-item label="搜索">
						<el-input v-model="queryForm.keyword" @keyup.enter="onSearch" clearable placeholder="请输入表名称/表注释" />
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
		<div class="table-btn-box mb-3">
			<el-button type="primary" plain @click="downloadCode()">
				<el-icon class="mr5">
					<ele-download />
				</el-icon>
				生成代码
			</el-button>
		</div>
		<!--    表格-->
		<el-table ref="tableRef" :data="tableData.data" border>
			<el-table-column type="selection" width="50" align="center" />
			<el-table-column prop="_tableIndex" label="序号" width="60" align="center" />
			<el-table-column prop="tableName" label="表名称" align="left" />
			<el-table-column prop="tableComment" label="表注释" align="left" />
			<el-table-column prop="className" label="实体类名称" align="left" />
			<el-table-column prop="createTime" label="创建时间" align="center" />
			<el-table-column prop="updateTime" label="最近生成时间" align="center" />
			<el-table-column label="操作" fixed="right" align="center" width="226">
				<template #default="{ row }">
					<el-button link type="primary" @click="previewCode(row.tableName)">
						<el-icon><ele-zoom-in /></el-icon>预览
					</el-button>
					<el-button link type="primary" @click="jumpConfiguration(row.tableName)">
						<el-icon><ele-edit /></el-icon>编辑
					</el-button>
					<!--					<el-button link type="primary" @click="syncTableInfo(row.tableName)">-->
					<!--						<el-icon><ele-refresh /></el-icon>同步-->
					<!--					</el-button>-->
					<el-button link type="primary" @click="downloadCode([row.tableName], row.generatorType)">
						<el-icon><ele-download /></el-icon>生成
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--    分页-->
		<Pagination
			v-model:currentPage="paginationData.pageIndex"
			v-model:pageSize="paginationData.pageSize"
			:total="paginationData.total"
			@changePage="changePage"
		/>

		<el-dialog v-model="preview.isShow" class="code-dialog el-scrollbar" title="代码预览" width="80%" fullscreen @close="preview.isShow = false">
			<el-tabs v-model="preview.activeName">
				<el-tab-pane v-for="item in preview.data" :key="item.fileName" :label="item.fileName" :name="item.fileName">
					<div class="preview-box">
						<el-button text class="copy-btn" type="info" @click="copyCode(item.fileContent)">
							<el-icon>
								<ele-document-copy />
							</el-icon>
							复制
						</el-button>
						<hljsVuePlugin.component ref="codeRef" language="JavaScript" :code="item.fileContent" />
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</el-card>
</template>
<script setup>
import { downloadCodeApi, generatorCodeApi, getDbTablePageApi, previewCodeApi } from '@/api/code';
import { router } from '@/router';
import 'highlight.js/styles/github.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import { ElMessage } from 'element-plus';
import useClipboard from 'vue-clipboard3';
import { calcTableIndex } from '@/utils';
import { ref, reactive } from 'vue';

const tableRef = ref();

/** 查询*/
let queryForm = ref({});
// 查询
const onSearch = () => {
	paginationData.pageIndex = 1;
	getTableList();
};
// 重置
const onReset = () => {
	queryForm.value = {};
	paginationData.pageIndex = 1;
	getTableList();
};

/** 分页*/
// 分页数据
const paginationData = reactive({
	pageIndex: 1,
	pageSize: 10,
	total: 0,
});
// 翻页
const changePage = (page) => {
	paginationData.pageIndex = page;
	getTableList();
};

/** 表格*/
// 表格数据
const tableData = reactive({
	data: [],
});
// 获取表格列表
const getTableList = () => {
	getDbTablePageApi({ ...paginationData, ...queryForm.value }).then((res) => {
		tableData.data = calcTableIndex(res, paginationData);
		paginationData.total = res.total;
	});
};

// 跳转配置页面
const jumpConfiguration = (tableName) => {
	router.push({
		path: '/tool/code/config',
		query: {
			tableName,
		},
	});
};

// 同步表信息
// const syncTableInfo = (tableName) => {};

// 生成代码
const downloadCode = async (tableNames, generatorType) => {
	if (tableNames === undefined) {
		tableNames = tableRef.value.getSelectionRows().map((p) => p.tableName);
	}
	if (tableNames?.length === 0) {
		ElMessage.warning('请选择要下载的表');
		return;
	}
	if (generatorType === 1) {
		// 下载代码
		let downloadFileName = '';
		if (tableNames?.length > 1) {
			downloadFileName = 'spring-boot-plus-code.zip';
		} else {
			if (tableNames) {
				downloadFileName = tableNames[0] + '-code.zip';
			}
		}
		downloadCodeApi({ tableNames }).then((res) => {
			const blob = new Blob([res], { type: 'application/zip' });
			const elink = document.createElement('a');
			elink.download = downloadFileName;
			elink.style.display = 'none';
			elink.href = window.URL.createObjectURL(blob);
			document.body.appendChild(elink);
			elink.click();
			window.URL.revokeObjectURL(elink.href); // 释放URL 对象
			document.body.removeChild(elink);
		});
	} else {
		// 生成代码
		await generatorCodeApi({ tableNames });
		ElMessage.success('生成成功');
	}
};

const preview = reactive({
	isShow: false,
	activeName: '',
	data: [],
});
// 预览
const previewCode = (tableName) => {
	previewCodeApi(tableName).then((res) => {
		preview.data = res;
		preview.activeName = res[0].fileName;
		preview.isShow = true;
	});
};

// 复制
const { toClipboard } = useClipboard();
const copyCode = async (code) => {
	try {
		await toClipboard(code);
		ElMessage.success('复制成功');
	} catch (e) {
		ElMessage.error('复制失败');
	}
};

getTableList();
</script>
<style lang="scss">
//.el-dialog__body {
//	max-height: calc(100vh - 80px) !important;
//}

.preview-box {
	position: relative;

	.copy-btn {
		position: absolute;
		right: 10px;
		top: 10px;
	}
}
</style>
