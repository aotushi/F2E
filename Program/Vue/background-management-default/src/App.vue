<template>
  <div id="app">
    <div v-if="$route.path === '/'">
      <img alt="Vue logo" src="./assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>

    <router-view v-else></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    console.log("route", this.$route, this.$router);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
