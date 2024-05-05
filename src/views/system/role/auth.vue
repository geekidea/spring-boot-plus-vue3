<template>
	<div>
		<el-dialog width="500px" :model-value="authData.isShow" destroy-on-close title="分配权限" @closed="closeAuthDialog">
			<div class="menu-tree">
				<el-tree
					ref="authRef"
					:data="authData.data"
					node-key="id"
					:props="props"
					default-expand-all
					:default-checked-keys="authData.checkedKeys"
					show-checkbox
				/>
			</div>
			<template #footer>
				<div class="dialog-footer">
					<el-button type="primary" @click="submitAuth">确定</el-button>
					<el-button @click="closeAuthDialog">取消</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { getMenuIdsByRoleIdApi, setRoleMenusApi } from '@/api/role';
import { getSysMenuTreeListApi } from '@/api/menu';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const authRef = ref();
const props = {
	label: 'name',
};
let authData = reactive({
	isShow: false,
	id: null,
	checkedKeys: [],
	data: [],
});
// 获取角色权限
const getRoleAuth = () => {
	getMenuIdsByRoleIdApi(authData.id).then((res) => {
		authRef.value.setCheckedKeys(res);
	});
};
// 打开授权弹框
const openAuthDialog = async (row) => {
	await getSysMenuTreeListApi({}).then((res) => {
		authData.data = (res || []).map((p) => {
			if (p.parentId === '0' && p.name === '首页') {
				p.disabled = true;
				authData.checkedKeys = [p.id];
			}
			return p;
		});
	});
	if (row?.id) {
		authData.id = row.id;
		getRoleAuth();
	}
	authData.isShow = true;
};
// 关闭授权弹框
const closeAuthDialog = () => {
	authData.isShow = false;
	authData.id = null;
};
// 提交
const submitAuth = () => {
	if (authData.id) {
		let params = {
			roleId: authData.id,
			menuIds: authRef.value.getCheckedKeys(),
		};
		if (params.menuIds.length > 0) {
			setRoleMenusApi(params).then(() => {
				ElMessage.success('设置成功');
				closeAuthDialog();
			});
		} else {
			ElMessage.error('请选择角色权限');
		}
	}
};

defineExpose({
	openAuthDialog,
});
</script>

<style scoped></style>
