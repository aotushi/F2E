<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <div>{{count}} {{state.foo}}</div>
</template>

<script setup>
// import HelloWorld from './components/HelloWorld.vue'

// export default {
//   name: 'App',
//   components: {
//     HelloWorld
//   }
// }

import {ref, reactive} from 'vue'
const count = ref('0')
const state = reactive({foo:'bar'})

setTimeout(() => {
  count.value = 1
  state.foo = 'foo'
}, 2000)
</script>
