<template>
  Index
  <el-button type="primary">测试按钮</el-button>
  <el-result
    icon="success"
    title="Success Tip"
    sub-title="Please follow the instructions"
  >
    <template #extra>
      <el-button type="primary">back</el-button>
    </template>
  </el-result>
</template>

<script>

export default {
  name: 'Index'
}
</script>

<style>

</style>
