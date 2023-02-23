<template>
	<div class="layer-wrap" v-if="isShowTip">
		<div class="layer-box">
			<div class="layer-content">
				<p>{{ layerText }}}</p>
			</div>
			<div class="layer-btns">
				<div @click="handleConfirm" v-if="showConf" class="no-bord">
					{{ confirmBtnText }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SignInTip",
	// model: {
	//   prop: 'isShowTip',
	//   event: 'closeDialog'
	// },
	props: {
		isShowTip: {
			default: false,
			type: Boolean,
		},

		confirmBtnText: {
			type: String,
			default: "确定",
		},

		// 弹窗内容
		layerText: {
			type: String,
			default: "您的账号正在另一台设备上登录,您即将退出88系统.若发现账号异常,请重新登录并及时修改密码",
		},

		showConf: {
			type: Boolean,
			default: true,
		},
		regionKey: {
			type: String,
			default: "",
		},
	},
	methods: {
		handleConfirm() {
			location.href = `/api/operation/j_spring_security_logout?key=${this.regionKey}`;
		},
	},
};
</script>

<style scoped></style>
