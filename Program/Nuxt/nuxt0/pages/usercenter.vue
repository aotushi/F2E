<!-- 用户：个人中心页面 -->
<script setup lang="ts">
const route = useRoute()
const pageKey = computed(() => route.fullPath)

// 默认路由 建议第一种
definePageMeta({
  middleware:   ['auth'],
  redirect: { path: '/usercenter/buy' }
})
// onMounted(() => {
//   if (route.name === 'usercenter') {
//     navigateTo({ name: 'usercenter-buy' })
//   }
// })


const menus = [{
  title: '已购课程',
  name: 'usercenter-buy',
}, {
  title: '修改资料',
  name: 'usercenter-info',
}, {
  title: '修改密码',
  name: 'usercenter-pwd',
}]

const activeName = computed(() => route.name)



const handleClike = (name: string) => {
  navigateTo({ name: name })
}
</script>

<template>
  <NGrid :x-gap="20">
    <NGridItem :span="5">
      <ul class="list-none bg-white rounded m-0 p-0">
        <li
          v-for="(item, index) in menus" :key="index"
          class="px-5 py-5 text-sm text-center cursor-pointer hover: (bg-blue-50)"
          :class="{ active: (item.name === activeName) }"
          @click="handleClike(item.name)"
        >
          {{ item.title }}
        </li>
      </ul>
    </NGridItem>
    <NGridItem :span="19">
      <div class="bg-white rounded mb-5 min-h-[66vh]">
        <NuxtPage :page-key="pageKey" />
      </div>
    </NGridItem>
  </NGrid>
</template>

<style>
.active {
  font-weight: bold;
  color: rgba(0, 175, 65);
  background-color: rgba(229, 231, 235);
}
</style>
