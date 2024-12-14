<template>
  <div class="lg:min-w-[1024px] bg-gray-100 flex flex-col min-h-screen">
    <MyHeader />
    <main class="container container-content m-auto mt-20">
      <slot />
    </main>
    <MyFooter />
  </div>
</template>

<style>
  .container-content {
    
  }
</style>
<script setup lang="ts">
onMounted(async () => {
  const store = useUser()
  // 获取用户信息
  const { ok, data } = await httpGet('/api/userinfo')
  if (ok)
    store.userInfo = data
})
</script>
