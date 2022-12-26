<script setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
</script>

<template>
  <div class="layout">
    <el-container class="container">
      <el-aside class="aside">
        <!-- 系统名称+logo -->
        <div class="head">
          <div>
            <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo">
            <span>vue3 admin</span>
          </div>
        </div>
        <div class="line" />
        <el-menu 
          background-color="#222832" 
          text-color="#fff"
          router
        >
          <!-- 一级栏目 -->
          <el-sub-menu index="1">
            <template #title>
              <span>Dashboard</span>
            </template>
            <!-- 二级栏目 -->
            <el-menu-item-group>
              <el-menu-item index="/">
                <el-icon>
                  <DataLine />
                </el-icon>首页
              </el-menu-item>
              <el-menu-item index="/add">
                <el-icon>em index="/add">
                  <DataLine />
                </el-icon>添加商品
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header/>
        <div class="main">
          <router-view />
        </div>
        <Footer/>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #fff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px!important;
  background-color: #222832;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}
.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #fff;
}

.line {
  border-top: 1px solid hsla(0, 0%, 100%, .05);
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px)
}
</style>

<style>
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>
