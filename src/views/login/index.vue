<template>
	<div class="content">
		<div class="form-box">
			<div class="form">
				<div class="sys-name mb-7 flex justify-center content-center">
					<img class="logo-img mr-1.5" src="@/assets/logo.png" alt="" />spring-boot-plus管理后台
				</div>
				<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
					<el-form-item class="mb-6" prop="username">
						<el-input style="width: 300px" :prefix-icon="User" clearable v-model="ruleForm.username" placeholder="请输入用户名" />
					</el-form-item>
					<el-form-item class="mb-6" prop="password">
						<el-input :prefix-icon="Lock" show-password clearable v-model="ruleForm.password" placeholder="请输入密码" />
					</el-form-item>
					<el-button size="large" type="primary" round @click="login">登录</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user';
import { Lock, User } from '@element-plus/icons-vue';
import md5 from 'js-md5';
import { NextLoading } from '@/utils/loading';
import { useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';

const router = useRouter();

const ruleForm = reactive({
	username: 'admin',
	password: 'boot666',
	// password: '123456',
});
const rules = reactive({
	username: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur',
		},
	],
	password: [
		{
			required: true,
			message: '请输入密码',
			trigger: 'blur',
		},
	],
});
const login = () => {
	useUserStore()
		.login({
			username: ruleForm.username,
			password: md5(ruleForm.password),
		})
		.then(async () => {
			NextLoading.start();
			const redirect = router.currentRoute.value.query.redirect;
			if (redirect) {
				router.push(redirect);
			} else {
				router.push('/');
			}
		});
};
// 页面加载时
onMounted(() => {
	NextLoading.done();
});
</script>

<style scoped lang="scss">
.content {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: url('../../assets/login-bg.png') no-repeat center;
	background-size: 100% 100%;
	box-sizing: border-box;
	padding: 30px;

	.form-box {
		width: 1150px;
		margin: auto;
		height: 600px;
		background: url('../../assets/login-form.png') no-repeat center / cover;
		display: flex;
		border-radius: 20px;
		justify-content: flex-end;
		overflow: hidden;
		box-shadow: 0 0 15px 10px rgba(46, 92, 246, 0.2);
	}

	.form {
		width: 450px;
		text-align: center;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.sys-name {
			font-weight: normal;
			font-size: 22px;
			white-space: nowrap;
			animation: logoAnimation 0.8s ease;

			.logo-img {
				width: 40px;
			}
		}
	}
}

:deep(*) {
	.el-button {
		width: 100%;
		font-size: 16px;
		height: 45px;
	}

	.el-input__inner {
		--el-input-inner-height: 45px;
		font-size: 16px;
	}

	.el-icon {
		font-size: 16px;
	}
}
</style>
