<template>IndexConfig</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

router.beforeEach((to) => {
	console.log("to.name", to.name);
});
</script>

<style scoped></style>
