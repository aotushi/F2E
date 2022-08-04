<template>
  <div>Search</div>
</template>

<script>
export default {
  name: 'HeaderCom',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    toSearch() {
      this.$router.push('/search/' + this.keyword)
    }
  }
}
</script>

<style>

</style>
