<template>
  <div>
    <el-card shadow="never">
      <!--    查询-->
      <el-form :model="queryForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :lg="8" :xl="6">
            <el-form-item label="搜索">
              <el-input v-model="queryForm.keyword" clearable placeholder="请输入名称/配置key/配置值" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" :xl="6">
            <el-form-item label="类型">
              <el-select v-model="queryForm.isSystem" clearable placeholder="请选择类型">
                <el-option label="系统类型" :value="1" />
                <el-option label="其他类型" :value="0" />
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
      <!--       新增-->
      <el-button type="primary" @click="openDialog" class="mb-3">
        <el-icon class="mr-2">
          <ele-circle-plus/>
        </el-icon>
        新 增
      </el-button>
      <!--    表格-->
      <el-table v-loading="tableData.status" :data="tableData.data" border style="width: 100%" row-key="id">
        <el-table-column prop="_tableIndex" label="序号" align="center" width="60px" />
        <el-table-column prop="configName" label="配置名称" align="center" />
        <el-table-column prop="configKey" label="配置key" align="center" />
        <el-table-column prop="configValue" label="配置值" align="center" />
        <el-table-column prop="isSystem" label="配置类型" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.isSystem" disable-transitions>系统类型</el-tag>
            <el-tag v-else type="info" disable-transitions>其他类型</el-tag>
          </template>
        </el-table-column>
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
            <el-button link type="primary" @click="openDialog(row)">
              <el-icon><ele-edit/></el-icon>修改
            </el-button>
            <el-button v-if="!row.isSystem" link type="primary" @click="delTableData(row)">
              <el-icon><ele-delete/></el-icon>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      分页-->
      <Pagination :total="pageData.total" :currentPage="pageData.pageIndex"
                         :pageSize="pageData.pageSize" @changePage="changePage"/>
    </el-card>

    <!--    字典列表：添加，编辑弹框-->
    <Dialog ref="dialogRef" @refresh="getTableList"/>
  </div>
</template>
<script setup>
import Dialog from "./components/dialog.vue";
import {deleteSysConfigApi, getSysConfigPageApi} from "@/api/configuration";
import {ElMessage, ElMessageBox} from "element-plus";
import {reactive, ref} from "vue";
import {calcTableIndex} from "@/utils";

/**
 * @description查询
 * */
let queryForm = ref({});
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
  isLoading: false,
});

// 获取表格列表
const getTableList = () => {
  tableData.isLoading = true;
  getSysConfigPageApi({ ...pageData, ...queryForm.value }).then((res) => {
    tableData.data = calcTableIndex(res, pageData);
    pageData.total = res.total;
    tableData.isLoading = false;
  });
};
// 删除列表数据
function delTableData(row) {
  ElMessageBox.confirm('是否确认删除本条数据？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {
        deleteSysConfigApi(row.id).then(() => {
          ElMessage.success('删除成功');
          getTableList();
        });
      })
      .catch(() => {});
}

/**
 * @description新增、编辑弹框
 * */
const dialogRef= ref(null);
// 打开表格操作弹框
function openDialog(data = {}) {
  dialogRef.value.openDialog(data);
}

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
