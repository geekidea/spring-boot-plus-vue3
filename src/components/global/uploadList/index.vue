<template>
	<el-upload
		v-model:file-list="state.fileList"
		:limit="limit"
		:before-upload="beforeUpload"
		:http-request="httpRequest"
		:on-success="uploadSuccess"
		class="upload-box"
	>
		<template #default>
			<!--      头像上传-->
			<div class="upload-head">
				<el-icon size="30" color="#c0ccda"><ele-plus /></el-icon>
			</div>
		</template>
		<template #file="{ file }">
			<img v-if="file.url" class="upload-head" :src="file.url" alt="" />
		</template>
	</el-upload>
</template>

<script setup>
import { reactive, computed } from 'vue';

const props = defineProps({
	modelValue: {
		type: [String, Array],
		required: true,
	},
	limit: {
		type: Number,
		default: 1,
	},
	type: {
		type: String,
		default: 'image',
	},
	customStyle: {
		type: Object,
		default: () => ({}),
	},
});
const emits = defineEmits(['update:modelValue']);

const state = reactive({
	fileList: computed({
		get: () => {
			return [
				{
					url: props.modelValue,
				},
			];
		},
		set: (val) => {
			console.log(22, val);
			emits('update:modelValue', val[0].url);
		},
	}),
});

// 上传之前
const beforeUpload = (rawFile) => {
	console.log('rawFile', rawFile);
	return false;
};

// 自定义上传
const httpRequest = (options) => {
	console.log('options', options);
};

// 上传成功
const uploadSuccess = (response) => {
	console.log('response', response);
};
</script>

<style scoped lang="scss">
.upload-head {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 100px;
	border: 1px dashed #c0ccda;
	border-radius: 50%;
}
</style>
