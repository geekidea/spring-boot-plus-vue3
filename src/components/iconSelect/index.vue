<template>
	<el-popover placement="bottom" :width="314" trigger="click">
		<template #reference>
			<el-input v-model="data.value" readonly placeholder="请选择图标">
				<template #prepend>
					<el-button>
						<SvgIcon :name="data.value" />
					</el-button>
				</template>
			</el-input>
		</template>
		<div class="tab-pane-box">
			<el-tabs type="border-card">
				<el-tab-pane label="ele">
					<el-scrollbar view-class="icon-box" :height="300">
						<el-button :type="data.value === item ? 'primary' : ''" v-for="item in data.elIcons" :key="item" @click="changeIcon(item)" plain>
							<SvgIcon :name="item" />
						</el-button>
					</el-scrollbar>
				</el-tab-pane>
				<el-tab-pane label="本地">
					<el-scrollbar view-class="icon-box" :height="300">
						<el-button :type="data.value === item ? 'primary' : ''" v-for="item in data.localIcons" :key="item" @click="changeIcon(item)" plain>
							<SvgIcon :name="item" />
						</el-button>
					</el-scrollbar>
				</el-tab-pane>
			</el-tabs>
		</div>
	</el-popover>
</template>

<script setup>
import { reactive, computed } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const modules = import.meta.glob('@/assets/svg/*.svg');

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
});

const emits = defineEmits(['update:modelValue']);

const data = reactive({
	value: computed({
		get: () => props.modelValue || '',
		set: (val) => {
			emits('update:modelValue', val);
		},
	}),
	localIcons: [],
	elIcons: [],
});

for (const path in modules) {
	data.localIcons.push('svg-' + path.split('/src/assets/svg/')[1].split('.svg')[0]);
}

for (const [key] of Object.entries(ElementPlusIconsVue)) {
	data.elIcons.push('ele-' + key.replace(/([a-z])([A-Z])/g, '$1-$2').toLocaleLowerCase());
}

const changeIcon = (value) => {
	data.value = value;
};
</script>

<style lang="scss">
.el-tabs__content {
	padding: 0 !important;
}
.icon-box {
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	gap: 10px;

	.el-button {
		width: 36px;
		padding: 0 !important;
		margin: 0 !important;
	}
}
</style>
