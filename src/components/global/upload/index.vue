<template>
	<el-upload :show-file-list="false" :before-upload="beforeUpload" :http-request="httpRequest" :on-success="uploadSuccess" class="upload-box">
		<template #default>
			<img v-if="fileUrl" class="upload-img" :style="customStyle" :src="fileUrl" alt="" />
			<!--      图片上传-->
			<div v-else class="upload-img" :style="customStyle">
				<el-icon size="30" color="#c0ccda"><ele-plus /></el-icon>
			</div>
		</template>
		<template #tip>
			<slot name="tip"></slot>
		</template>
	</el-upload>
</template>

<script setup>
import { computed } from 'vue';
import { uploadApi } from '@/api/file';
import { ElMessage } from 'element-plus';

const props = defineProps({
	modelValue: {
		type: String,
		required: true,
	},
	// 上传数量限制
	limit: {
		type: Number,
		default: 1,
	},
	// 文件类型，例如['png', 'jpeg']
	fileType: {
		type: Array,
		default: () => [],
	},
	// 自定义样式
	customStyle: {
		type: Object,
		default: () => ({}),
	},
	// 文件大小限制，单位M，-1表示不限制
	fileSize: {
		type: Number,
		default: 5,
	},
});
const emits = defineEmits(['update:modelValue', 'change']);

const fileUrl = computed({
	get: () => props.modelValue,
	set: (val) => {
		emits('update:modelValue', val);
	},
});

// 上传之前
const beforeUpload = (rawFile) => {
	const fileType = rawFile.name.split('.').pop();
	if (props.fileType.length && !props.fileType.includes(fileType)) {
		ElMessage.error(`抱歉，文件格式不正确，只支持${props.fileType.join('/')}格式`);
		return false;
	} else if (rawFile.size / 1024 / 1024 > props.fileSize && props.fileSize !== -1) {
		ElMessage.error(`抱歉，暂时不支持大于${props.fileSize}M的文件上传`);
		return false;
	}
	return true;
};

// 自定义上传
const httpRequest = (options) => {
	return uploadApi({
		file: options.file,
		type: 'any',
	});
};

// 上传成功
const uploadSuccess = (response) => {
	fileUrl.value = response.url;
	emits('change', response.url);
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
}
</style>
