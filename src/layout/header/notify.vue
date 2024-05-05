<template>
	<el-popover :width="300" trigger="click" popper-style="padding: 20px;padding:0">
		<template #reference>
			<div class="h-full flex justify-center items-center">
				<svg-icon class="navbar-icon" name="svg-notice" title="通知" />
			</div>
		</template>
		<template #default>
			<el-tabs v-model="activeName">
				<el-tab-pane label="通知(0)" name="first">
					<div class="news-body">
						<el-empty description="暂无通知" />
					</div>
				</el-tab-pane>
				<el-tab-pane label="消息(0)" name="second">
					<div class="news-body">
						<el-empty description="暂无消息" />
					</div>
				</el-tab-pane>
				<el-tab-pane label="待办(0)" name="third">
					<div class="news-body">
						<el-empty description="暂无待办" />
					</div>
				</el-tab-pane>
			</el-tabs>
		</template>
	</el-popover>
</template>

<script setup>
const activeName = 'first';
</script>

<style lang="scss" scoped>
:deep(*) {
	.el-tabs__nav-scroll {
		display: flex !important;
		justify-content: center;
	}
	.el-tabs__nav-wrap::after {
		height: 1px !important;
	}
	.el-empty {
		padding: 0 0 10px;
	}
}
</style>
