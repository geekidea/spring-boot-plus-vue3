<template>
	<el-date-picker v-model="data.value" value-format="YYYY-MM-DD" start-placeholder="开始时间" end-placeholder="结束时间" :type="type" />
</template>

<script setup>
import { computed, reactive } from 'vue';

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	startDate: {
		type: String,
		default: '',
	},
	endDate: {
		type: String,
		default: '',
	},
	type: {
		type: String,
		default: 'date',
	},
	placeholder: {
		type: String,
		default: '请选择',
	},
});

const emits = defineEmits(['update:modelValue', 'update:startDate', 'update:endDate']);

const data = reactive({
	value: computed({
		get: () => {
			if (props.type === 'daterange') {
				return [props.startDate, props.endDate];
			} else {
				return props.modelValue;
			}
		},
		set: (val) => {
			if (props.type === 'daterange') {
				Array.isArray(val) ? emits('update:startDate', val[0]) : emits('update:startDate', '');
				Array.isArray(val) ? emits('update:endDate', val[1]) : emits('update:endDate', '');
			} else {
				emits('update:modelValue', val);
			}
		},
	}),
});
</script>
