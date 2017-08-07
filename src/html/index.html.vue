<template>
  <div class="app">
    <img src="../assets/logo.png">
    <hello></hello>
    <button @click="download">点击下载src/test.html</button>
  </div>
</template>

<script>
  import Hello from '../components/Hello'

  document.title = "这是标题"

  export default {
    name: 'app',
    components: {
      Hello
    },
    methods: {
        download: function() {
            this.$http.get("./src/test.html").then(function(resp){
                console.log(resp.body);
                alert("下载成功，请看console.log")
            })
        }
    }
  }
</script>

<style>
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
