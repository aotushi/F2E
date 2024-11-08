<script setup lang="ts">
useHead({
  title: '登录',
})

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <h2 class="flex justify-between">
    返回羊村
    <nuxt-link to="/register">
      <NButton quaternary type="primary" size="tiny">
        还未入村？
      </NButton>
    </nuxt-link>
  </h2>

  <NAlert title="演示账号和密码为：test" type="info" class="mb-6" />

  <NForm ref="formRef" class="w-[340px]" size="large">
    <NFormItem :show-label="false" path="username">
      <NInput clearable placeholder="用户名" />
    </NFormItem>
    <NFormItem :show-label="false" path="password">
      <NInput clearable placeholder="密码" type="password" />
    </NFormItem>

    <div>
      <NButton class="w-full" type="primary">
        登录
      </NButton>
    </div>
  </NForm>
</template>
