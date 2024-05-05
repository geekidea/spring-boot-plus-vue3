<template>
	<el-icon :size="size" :color="color">
		<!--  本地svg图标-->
		<svg v-if="isShowIconSvg" aria-hidden="true" class="svg-icon">
			<use :xlink:href="`#${name}`" />
		</svg>
		<!--  element-plus 自带 svg 图标-->
		<component v-else-if="isShowIconEle" :is="name" />
		<!--  在线链接、本地引入等图标-->
		<img v-else-if="isShowIconImg" :src="name" :style="setIconImgStyle" alt="" />
		<!--  其他图标,如字体图标：iconfont icon-user-->
		<i v-else :class="name" :style="setIconFontStyle" />
	</el-icon>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	// 图标组件名字
	name: {
		type: String,
	},
	// 大小
	size: {
		type: Number,
		default: () => 14,
	},
	// 颜色
	color: {
		type: String,
	},
});

// 用于判断svg图标显示、隐藏
const isShowIconSvg = computed(() => {
	return props?.name?.startsWith('svg-');
});

// 用于判断 element plus 自带 svg 图标的显示、隐藏
const isShowIconEle = computed(() => {
	return props?.name?.startsWith('ele-');
});

// 在线链接、本地引入地址前缀
const linesString = ['https', 'http', '/src', '/assets', 'data:image'];
// 用于判断在线链接、本地引入等图标显示、隐藏
const isShowIconImg = computed(() => {
	return linesString.find((str) => props.name?.startsWith(str));
});

// 设置图片样式
const setIconImgStyle = computed(() => {
	return `width: ${props.size}px;height: ${props.size}px;display: inline-block;overflow: hidden;`;
});

// 设置字体图标样式
const setIconFontStyle = computed(() => {
	return `font-size: ${props.size}px;color: ${props.color};`;
});
</script>
