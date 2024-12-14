<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'

useHead({
  title: '登录',
})

// 定义页面布局
definePageMeta({
  layout: 'blank',
})

const formRef = ref<FormInst>()
const model = ref({
  username: '',
  password: '',
})

const rules: FormRules = {
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  }],
}

const store = useUser()

const login = () => {
  // 校验
  formRef.value!.validate(async (errors) => {
    if (!errors) {
      const { ok, data } = await httpPost('/api/login', {
        username: model.value.username,
        password: model.value.password,
      })
      if (ok) {
        // 保存user状态
        store.userInfo = data
        // 跳转首页
        // navigateTo('/')
        const callback = useRoute().query.callback
        if (callback) {
          navigateTo(callback as string)
        } else {
          navigateTo('/')}
      }
    }
  })
}
</script>

<template>
  <h2 class="flex justify-between">
    
    <nuxt-link to="/register">
      <n-button quaternary type="primary" size="tiny">
        还未注册？
      </n-button>
    </nuxt-link>
  </h2>

  <n-alert title="演示账号和密码为：test" type="info" class="mb-6" />

  <n-form ref="formRef" :model="model" :rules="rules" class="w-[340px]" size="large">
    <NFormItem :show-label="false" path="username">
      <NInput v-model:value="model.username" clearable placeholder="用户名" />
    </NFormItem>
    <NFormItem :show-label="false" path="password">
      <NInput v-model:value="model.password" clearable placeholder="密码" type="password" />
    </NFormItem>

    <div>
      <n-button class="w-full" type="primary" @click="login">
        登录
      </n-button>
    </div>
  </n-form>
</template>

