
<template>
	<div class="register-container">
		<!-- 注册内容 -->
		<div class="register">
			<h3>
				注册新用户
				<!-- <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a> -->
				<span class="go"
					>我有账号，去
					<router-link to="/login" target="_blank">登陆</router-link>
				</span>
			</h3>
			<div class="content">
				<label>手机号:</label>
				<input
					placeholder="请输入你的手机号"
					v-model="phone"
					name="phone"
					v-validate="{ required: true, regex: /^1\d{10}$/ }"
					:class="{ invalid: errors.has('phone') }"
				/>
				<!-- 获取phone字段验证错误的提示信息 -->
				<span class="error-msg">{{ errors.first("phone") }}</span>
				<!-- <input type="text" placeholder="请输入你的手机号" v-model="phone">
        <span class="error-msg">错误提示信息</span> -->
			</div>
			<div class="content">
				<label>验证码:</label>
				<input
					placeholder="请输入你的验证码"
					v-model="code"
					name="code"
					v-validate="{ required: true, regex: /^d{6}$/ }"
					:class="{ invalid: errors.has('code') }"
				/>
				<!-- <input type="text" placeholder="请输入验证码" v-model="code" /> -->
				<!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code"> -->
				<button style="height: 38px; width: 100px" @click="getCode">
					获取验证码
				</button>
				<!-- <span class="error-msg">错误提示信息</span> -->
				<span class="error-msg">{{ errors.first("code") }}</span>
			</div>
			<div class="content">
				<label>登录密码:</label>
				<!-- <input
					type="text"
					placeholder="请输入你的登录密码"
					v-model="password"
				/> -->
				<input
					placeholder="请输入你的密码"
					v-model="password"
					name="password"
					v-validate="{
						required: true,
						regex: /^[0-9A-Za-z]{6,20}$/,
					}"
					:class="{ invalid: errors.has('password') }"
				/>
				<!-- <span class="error-msg">错误提示信息</span> -->
				<span class="error-msg">{{ errors.first("password") }}</span>
			</div>
			<div class="content">
				<label>确认密码:</label>
				<!-- <input
					type="text"
					placeholder="请输入确认密码"
					v-model="password2"
				/> -->
				<input
					placeholder="请确认你的密码"
					v-model="password2"
					name="password2"
					v-validate="{ is: password }"
					:class="{ invalid: errors.has('password2') }"
				/>
				<!-- <span class="error-msg">错误提示信息</span> -->
				<span class="error-msg">{{ errors.first("password2") }}</span>
			</div>
			<div class="controls">
				<!-- <input name="m1" type="checkbox" v-model="isCheck" /> -->
				<input
					placeholder="请确认协议"
					type="checkbox"
					v-model="isCheck"
					name="isCheck"
					v-validate="{ agree: true }"
					:class="{ invalid: errors.has('isCheck') }"
				/>
				<span>同意协议并注册《尚品汇用户协议》</span>
				<!-- <span class="error-msg">错误提示信息</span> -->
				<span class="error-msg">{{ errors.first("isCheck") }}</span>
			</div>
			<div class="btn">
				<button @click="register">完成注册</button>
			</div>
		</div>

		<!-- 底部 -->
		<div class="copyright">
			<ul>
				<li>关于我们</li>
				<li>联系我们</li>
				<li>联系客服</li>
				<li>商家入驻</li>
				<li>营销中心</li>
				<li>手机尚品汇</li>
				<li>销售联盟</li>
				<li>尚品汇社区</li>
			</ul>
			<div class="address">地址：北京市昌平区xxxxxxxxxxxx7层</div>
			<div class="beian">京ICP备19006430号</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Register",
	data() {
		return {
			phone: "",
			password: "",
			password2: "",
			code: "",
			isCheck: true,
		};
	},
	methods: {
		async register() {
			// 点击完成注册首先对所有的表单进行整体验证, 验证通过返回true,没通过返回false
			const success = await this.$validator.validateAll();
			// 发请求,把收集数据作为参数传递到后台数据库
			let { phone, password, password2, code } = this;
			if (!phone || !password || !password2 || !code)
			// 	return alert("register again");
			if (success) {
				try {
					await this.$store.dispatch("userRegister", {
						phone,
						password,
						code,
					});
					alert("注册成功, 跳转到登录页面");
					this.$router.push("/login");
				} catch (error) {
					alert("注册失败原因: [" + error.message + "]");
				}
			}
		},
		// 获取验证码 写接口 自动添加
		async getCode() {
			try {
				await this.$store.dispatch("getCode", this.phone);
				alert("请求成功");
				this.code = this.$store.state.user.code;
			} catch (error) {
				alert("获取验证码失败");
			}
		},
	},
};
</script>

<style lang="less" scoped>
.register-container {
	.register {
		width: 1200px;
		height: 445px;
		border: 1px solid rgb(223, 223, 223);
		margin: 0 auto;
		h3 {
			background: #ececec;
			margin: 0;
			padding: 6px 15px;
			color: #333;
			border-bottom: 1px solid #dfdfdf;
			font-size: 20.04px;
			line-height: 30.06px;
			span {
				font-size: 14px;
				float: right;
				a {
					color: #e1251b;
				}
			}
		}
		div:nth-of-type(1) {
			margin-top: 40px;
		}
		.content {
			padding-left: 390px;
			margin-bottom: 18px;
			position: relative;
			label {
				font-size: 14px;
				width: 96px;
				text-align: right;
				display: inline-block;
			}
			input {
				width: 270px;
				height: 38px;
				padding-left: 8px;
				box-sizing: border-box;
				margin-left: 5px;
				outline: none;
				border: 1px solid #999;
			}
			img {
				vertical-align: sub;
			}
			.error-msg {
				position: absolute;
				top: 100%;
				left: 495px;
				color: red;
			}
		}
		.controls {
			text-align: center;
			position: relative;
			input {
				vertical-align: middle;
			}
			.error-msg {
				position: absolute;
				top: 100%;
				left: 495px;
				color: red;
			}
		}
		.btn {
			text-align: center;
			line-height: 36px;
			margin: 17px 0 0 55px;
			button {
				outline: none;
				width: 270px;
				height: 36px;
				background: #e1251b;
				color: #fff !important;
				display: inline-block;
				font-size: 16px;
			}
		}
	}
	.copyright {
		width: 1200px;
		margin: 0 auto;
		text-align: center;
		line-height: 24px;
		ul {
			li {
				display: inline-block;
				border-right: 1px solid #e4e4e4;
				padding: 0 20px;
				margin: 15px 0;
			}
		}
	}
}
</style>
