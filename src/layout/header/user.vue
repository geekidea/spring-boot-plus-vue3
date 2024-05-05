<template>
	<div class="pr-5 ml-3">
		<el-dropdown trigger="click">
			<span class="el-dropdown-content flex items-center">
				<!--				<img :src="useUserStore.head || logo" class="avatar-img" />-->
				<el-avatar :size="30" :src="userInfo?.head || logo" fit="scale-down" style="background-color: transparent" />
				<span class="el-dropdown-username">{{ userInfo?.nickname }}</span>
				<el-icon class="el-icon--right"><ele-arrow-down /></el-icon>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item @click="openUserInfoDrawer">个人中心</el-dropdown-item>
					<el-dropdown-item @click="logout"> 退出登录 </el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>

		<el-drawer v-model="drawerData.isShow" destroy-on-close append-to-body title="个人信息" @closed="closeUserInfoDrawer">
			<el-tabs v-model="drawerData.activeName">
				<el-tab-pane label="基本信息" name="user">
					<UserInfo ref="userRef" />
				</el-tab-pane>
				<el-tab-pane label="修改密码" name="password">
					<Password ref="pswRef" />
				</el-tab-pane>
			</el-tabs>
		</el-drawer>
	</div>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user';
import logo from '@/assets/logo.png';
import { storeToRefs } from 'pinia';
import { ref, reactive, defineAsyncComponent } from 'vue';

const Password = defineAsyncComponent(() => import('@/layout/components/password.vue'));
const UserInfo = defineAsyncComponent(() => import('@/layout/components/userinfo.vue'));

const userRef = ref();
const pswRef = ref();

const { userInfo } = storeToRefs(useUserStore());

const drawerData = reactive({
	isShow: false,
	activeName: 'user',
});

// 打开个人侧边栏
const openUserInfoDrawer = () => {
	drawerData.isShow = true;
};
// 关闭个人侧边栏
const closeUserInfoDrawer = () => {
	if (userRef.value) userRef.value.resetForm();
	if (pswRef.value) pswRef.value.resetForm();
	drawerData.activeName = 'user';
};

// 退出登录
const logout = () => {
	useUserStore().logout();
};
</script>

<style lang="scss" scoped>
.user-box {
	padding: 20px 10px;
}
.avatar-img {
	width: 30px;
	height: 30px;
	border-radius: 50%;
}
.el-dropdown-username {
	margin-left: 5px;
	user-select: none;
	cursor: pointer;
}
</style>
