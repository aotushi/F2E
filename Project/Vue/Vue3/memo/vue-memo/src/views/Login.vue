<template>
<div class="login-page">
  <el-form class="login-form">
    <h2>{{is_login ? '登录' : '注册'}}</h2>
    <el-form-item v-if="!is_login">
      <el-input placeholder="用户名" size="large" v-model="form.user_name" />
    </el-form-item>
    <el-form-item>
      <el-input placeholder="手机号" size="large" v-model="form.user_phone" />
    </el-form-item>
    <el-form-item>
      <el-input placeholder="密码" size="large" v-model="form.password" />
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm">{{is_login ? '提交' : '注册' }}</el-button>
      <div class="text-row">
        <span class="text-row" @click="is_login = !is_login">
          <span>
            {{ is_login ? '没有账号?去注册' : '已有账号?去登录' }}
          </span>
        </span>
      </div>
    </el-form-item>
  </el-form>
</div>
</template>

<script setup>
  import {ref} from 'vue'
  const is_login = ref(true)
  const loading= ref(false)
  const form = ref({
    phone: '',
    user_name: '',
    password: ''
  })
  const submitForm = () => {
    
  }
</script>

<style scoped lang="less">
  .login-form {
    width: 360px;
    background: #fff;
    padding: 30px 50px 10px 50px;
    margin: 20px auto;
    box-shadow: var(--el-box-shadow);
    .title {
      text-align: center;
      margin-bottom: 18px;
    }
  }
</style>