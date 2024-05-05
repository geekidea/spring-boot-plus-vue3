<template>
	<div class="pagination-box">
		<el-pagination
			v-model:current-page="paginationData.currentPage"
			v-model:page-size="paginationData.pageSize"
			:page-sizes="[10, 20, 50, 100]"
			background
			hide-on-single-page
			layout="total, sizes, prev, pager, next, jumper"
			:total="props.total"
			@size-change="changeSize"
			@current-change="changePage"
		/>
	</div>
</template>

<script setup>
import { reactive, computed } from 'vue';

const props = defineProps({
	total: {
		type: Number,
		default: 0,
	},
	currentPage: {
		type: Number,
		default: 1,
	},
	pageSize: {
		type: Number,
		default: 10,
	},
});

const emits = defineEmits(['changeSize', 'changePage', 'update:currentPage', 'update:pageSize']);

let paginationData = reactive({
	currentPage: computed({
		get: () => props.currentPage,
		set: (val) => {
			emits('update:currentPage', val);
		},
	}),
	pageSize: computed({
		get: () => props.pageSize,
		set: (val) => {
			emits('update:pageSize', val);
		},
	}),
});

// 每页条数
const changeSize = (size) => {
	paginationData.currentPage = 1;
	paginationData.pageSize = size;
	emits('changeSize', size);
};

// 翻页
const changePage = (page) => {
	paginationData.currentPage = page;
	emits('changePage', page);
};
</script>

<style lang="scss" scoped>
.pagination-box {
	display: flex;
	justify-content: flex-end;
	padding: 20px 0;
}
</style>
