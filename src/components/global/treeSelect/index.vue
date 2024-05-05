<template>
	<el-tree-select
		v-model="value"
		:filterable="filterable"
		:clearable="clearable"
		:check-strictly="checkStrictly"
		:props="config"
		:data="options"
		:placeholder="placeholder"
	/>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	modelValue: {
		type: [String, Number, Array],
		default: '',
	},
	placeholder: {
		type: String,
		default: '请选择',
	},
	config: {
		type: Object,
		default: () => {
			return {
				value: 'id',
				label: 'name',
			};
		},
	},
	options: {
		type: Array,
		default: () => [],
	},
	clearable: {
		type: Boolean,
		default: true,
	},
	filterable: {
		type: Boolean,
		default: false,
	},
	checkStrictly: {
		type: Boolean,
		default: true,
	},
});

const emits = defineEmits(['update:modelValue']);

const value = computed({
	get: () => props.modelValue,
	set: (val) => {
		emits('update:modelValue', val);
	},
});
</script>
