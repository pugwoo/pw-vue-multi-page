<template>
  <div id="app">
    <div class="title">你好，世界</div>
    <hello></hello>
  </div>
</template>

<script>
  import Hello from '@/components/Hello'

  export default {
    name: 'app',
    components: {
      Hello
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .title {
    color: red;
  }
</style>
