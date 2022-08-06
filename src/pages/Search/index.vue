<template>
  <!-- <div>Search</div> -->
  <TypeNav></TypeNav>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    toSearch() {
      // this.$router.push('/search/' + this.keyword)
    }
  }
}
</script>

<style>

</style>
