<template>
  <wv-button type="primary" @click.native="myclick">{{btn}}</wv-button>
</template>

<script>
  export default {
    data () {
      return {
        btn: '我是按钮'
      }
    },
    methods: {
      myclick: function () {
        this.$toast("操作成功")
      }
    }
  }
</script>

<style>
</style>
