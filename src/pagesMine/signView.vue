<template>
  <web-view :src="url+'#wechat_redirect'"></web-view>
</template>

<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  onShow() {
    this.$set(
      this,
      "url",
      this.$store.state.signatureList[this.$route.query.index].userSignUrl
    );
    console.log(this.url, 9)
  },
  methods: {}
};
</script>

<style scoped>
</style>
