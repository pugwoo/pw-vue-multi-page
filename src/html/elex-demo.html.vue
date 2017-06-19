<template>
  <div>
    <elex-button>测试</elex-button>
  </div>

</template>

<script>
  // elex/button.vue是复制自element-ui中的，这里的目的是演示从vue中复制组件源码出来，方便自己修改
  import ElexButton from '../components/elex/button'

  export default {
    components: {
      ElexButton
    }
  }
</script>

<style>

</style>
