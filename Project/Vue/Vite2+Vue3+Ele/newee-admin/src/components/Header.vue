<template>
  <div class="header">
    <div class="left">
      <el-icon class="back" v-if="state.hasBack" @click="back">
        <Back />
      </el-icon>
      <span style="font-size:20px;">{{ state.name }}</span>
    </div>
    <div class="right">
      <el-popover placement="bottom" :width="320" trigger="click" popper-class="popper-user-box">
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom" />
            {{ state.userInfo && state.userInfo.nickName || '' }}
            <i class="el-icon-caret-bottom" />
          </div>
        </template>
        <div class="nickname">
          <p>登录名: {{ state.userInfo && state.userInfo.loginUserName || '' }}</p>
          <p>昵称: {{ state.userInfo && state.userInfo.nickName || '' }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>


<script setup>
import { localRemove, pathMap } from '@/utils';
import axios from '@/utils/axios';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
// 获取路由实例
const router = useRouter()

//监听路由变化
router.afterEach(to => {
  // console.log('to', to)
  const { id } = to.query
  state.name = pathMap[to.name]
})

const state = reactive({
  name: 'dashboard',
  userInfo: null,
  hasBack: false
})

// 初始化执行方法
onMounted(() => {
  const pathname = window.location.hash.split('/')[1] || ''
  if (!['login'].includes(pathname)) {
    getUserInfo()
  }
})

// 获取用户信息
const getUserInfo = async () => {
  const userInfo = await axios.get('/adminUser/profile')
  state.userInfo = userInfo
}

// 退出登录
const logout = () => {
  axios.delete('/logout').then(() => {
    //退出后 清理本地token
    localRemove('token')
    //回到登录页
    router.push('/login')
  })
}

router.afterEach(to => {
  const { id } = to.query
  state.name = pathMap[to.name]
  state.hasBack = ['level2', 'level3'].includes(to.name)
})

const back = () => {
  router.back()
}
</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>

<style scoped>
.right>div>.icon {
  font-size: 18px;
  margin-right: 6px;
}

.author {
  margin-left: 10px;
  cursor: pointer;
}

.header .left .back {
  border: 1px solid #e9e9e9;
  padding: 5px;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
}
</style>
<style>
.popper-user-box {
  background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 0 !important;
}

.popper-user-box .nickname {
  position: relative;
  color: #ffffff;
}

.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>
