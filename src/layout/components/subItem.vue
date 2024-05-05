<template>
	<template v-for="item in child">
		<template v-if="item.meta.isShow">
			<el-sub-menu :index="item.path" :key="item.path" v-if="item.children && item.children.length > 0">
				<template #title>
					<SvgIcon :name="item.meta.icon" />
					<span class="menu-txt">{{ item.meta.title }}</span>
				</template>
				<sub-item :child="item.children" />
			</el-sub-menu>
			<template v-else>
				<el-menu-item :index="item.path" :key="item.path">
					<SvgIcon :name="item.meta.icon" />
					<span class="menu-txt">{{ item.meta.title }}</span>
				</el-menu-item>
			</template>
		</template>
	</template>
</template>

<script setup>
defineProps({
	child: {
		type: Array,
		default: () => [],
	},
});
</script>
