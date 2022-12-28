<template>
  <div class="login-body">
    <!-- 登录框div -->
    <div class="login-container">
      <!-- 登录框头部logo部分 -->
      <div class="head">
        <img src="https://s.weituibao.com/1582958061265/mlogo.png" alt="loginLogo" class="logo">
        <div class="name">
          <div class="title">新蜂商城</div>
          <div class="tips">Vue3.2 后台管理系统</div>
        </div>
      </div>
      <el-form 
        label-position="top" 
        :model="state.ruleForm"
        :rules="state.rules"
        class="login-form"
        ref="loginForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="state.ruleForm.username"  autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input 
            type="password" 
            show-password 
            v-model.trim="state.ruleForm.password" 
            autocomplete="off" 
          />
        </el-form-item>
        <el-form-item>
          <div style="color:#333">登录表示您已同意<a>服务条款</a></div>
          <el-button style="width:100%" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="state.checked" @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { localSet } from '@/utils';
import axios from '@/utils/axios';
import md5 from 'js-md5';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const state = reactive({
  ruleForm: {
    username: '',
    password: '',
  },
  checked: true,
  rules: {
    username: [{ required:'true', message: '账户不能为空', trigger: 'blur'}],
    password: [{ required:'true', message: '密码不能为空', trigger: 'blur'}]
  }
})

const loginForm = ref(null)

const submitForm = async () => {
  // console.log('loginForm', loginForm)
  loginForm.value.validate(valid => {
    // valid 布尔值 表示表单是否通过上面rules规则
    if (valid) {
      //  /adminUser/login 登录接口路径
      axios.post('/adminUser/login', {
        userName: state.ruleForm.username || '',
        passwordMd5: md5(state.ruleForm.password)
      }).then(res => {
        // 返回的时候会有一个 token，这个令牌就是我们后续去请求别的接口时要带上的，否则会报错，非管理员。
        // 这里我们将其存储到 localStorage 里面。
        localSet('token', res)
        // 此处登录完成之后，需要刷新页面
        window.location.href = '/'
        // router.push('/') 注意: 通过router方法跳转后,axios中的headers.token拿不到值
      })
    } else {
      return false
    }
  })
}
// 重制方法
const resetForm = () => {
  // loginForm能拿到 el-form 的重制方法
  loginForm.value.resetFields();
}
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}

.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}

.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}

.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
.login-form :deep() .el-form--label-top .el-form-item__label {
  padding: 0
}
.login-form :deep() .el-form-item {
  margin-bottom: 0;
}
</style>
