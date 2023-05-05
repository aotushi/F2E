<template>IndexConfig</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

router.beforeEach((to) => {
	console.log("2to.name", to.name);
});
// const routerReturn = router.beforeEach((to) => {
// 	console.log("to.name", to.name);
// });

onMounted(() => {
	console.log("indexConfig>router", router);
	console.log("onMounted>indexConfig");
});
onUnmounted(() => {
	console.log("onUnmounted>indexConfig");
	// routerReturn();
});
</script>

<style scoped></style>
