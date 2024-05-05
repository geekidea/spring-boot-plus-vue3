<template>
	<div class="h-full flex justify-center items-center">
		<svg-icon name="svg-theme" class="navbar-icon" title="配置" @click="isShowDrawer = true" />
	</div>

	<!--	<el-drawer v-model="isShowDrawer" title="布局设置" :size="260" append-to-body>-->
	<!--		<div class="config-box">-->
	<!--			&lt;!&ndash;      全局配置&ndash;&gt;-->
	<!--			<div class="theme-color config-item-box">-->
	<!--				<el-divider>全局配置</el-divider>-->
	<!--				<div class="config-item">-->
	<!--					<div class="config-item__label">主题色</div>-->
	<!--					<div class="config-item__value">-->
	<!--						<el-color-picker v-model="useConfigStoreHook().configure.themeColor" @change="themeColorChange" />-->
	<!--					</div>-->
	<!--				</div>-->
	<!--			</div>-->
	<!--			&lt;!&ndash;      界面显示&ndash;&gt;-->
	<!--			<div class="theme-color config-item-box">-->
	<!--				<el-divider>界面显示</el-divider>-->
	<!--				<div class="config-item">-->
	<!--					<div class="config-item__label">暗黑模式</div>-->
	<!--					<div class="config-item__value">-->
	<!--						<el-switch v-model="useConfigStoreHook().configure.isDark" @change="darkChange" />-->
	<!--					</div>-->
	<!--				</div>-->
	<!--			</div>-->
	<!--		</div>-->
	<!--	</el-drawer>-->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
// import {useConfigStoreHook} from "@/store/modules/config";
// import {useConfigure} from "@/layout/hook/useConfigure";
//
// const {configure} = storeToRefs(useConfigStoreHook())
//
const isShowDrawer = ref(false);
//
// /** 修改主题色*/
// const themeColorChange = (color: string) => {
//   if (!color){
//     color = '#2e5cf6';
//   }
//   useConfigStoreHook().storageConfigureChange('themeColor', color);
//   useConfigure().setThemeColor(color);
// }
//
// /** 修改暗黑模式*/
// const darkChange = (isDark: boolean) => {
//   useConfigStoreHook().storageConfigureChange('isDark', isDark);
//   useConfigure().setDark(isDark);
// }
//
// /** 修改灰色模式*/
// const greyChange = (isGrey: boolean) => {
//   useConfigStoreHook().storageConfigureChange('isGrey', isGrey);
//   useConfigure().setGrey(isGrey);
// }
// /** 修改色弱模式*/
// const weaknessChange = (isWeakness: boolean) => {
//   useConfigStoreHook().storageConfigureChange('isWeakness', isWeakness);
//   useConfigure().setWeakness(isWeakness);
// }
//
//
// /** 选择界面布局模式*/
// const layoutModeChange = (val: number) => {
//   useConfigStoreHook().storageConfigureChange('layoutMode', val);
// }
</script>

<style lang="scss" scoped>
.config-item-box {
	margin-bottom: 20px;
}

.config-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
}

.layout-box {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	.layout-item {
		width: 50%;
		height: 80px;
		padding: 8px;

		.layout-item-section {
			width: 100%;
			height: 100%;
			border-radius: 3px;
			background-color: #e9eef3;
			position: relative;
			overflow: hidden;
			cursor: pointer;
			border: 1.5px solid transparent;

			&:hover {
				border: 1.5px solid var(--el-color-primary);
			}

			&.active {
				border: 1.5px solid var(--el-color-primary);

				.layout-item__title {
					color: var(--el-color-primary);
					border: 1px solid var(--el-color-primary);
				}
			}

			.layout-item__header {
				position: absolute;
				width: 100%;
				height: 10px;
				background-color: #b3c0d1;
				top: 0;
				z-index: 1;
			}

			.layout-item__menu__1 {
				width: 10px;
				height: 100%;
				position: absolute;
				left: 0;
				z-index: 2;
				background-color: #b3c0d1;
			}

			.layout-item__menu {
				width: 20px;
				height: 100%;
				position: absolute;
				left: 0;
				z-index: 2;
				background-color: #d3dce6;

				&.layout-item__menu__2 {
					left: 10px;
				}
			}

			.layout-item__title {
				border-radius: 50%;
				width: 40px;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
				transform: translate(-50%, -50%) rotate(45deg);
				font-size: 12px;
				position: absolute;
				left: 50%;
				top: 50%;
				z-index: 3;
				color: var(--el-color-primary-light-6);
				border: 1px solid var(--el-color-primary-light-6);
			}
		}
	}
}
</style>
