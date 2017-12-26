<style lang="less">
@import './css/index.less';
</style>

<template>
  <div class="container">
    <div class="hello">
      <p>hello google</p>
    </div>
    <input v-model="a">
    <div>{{a}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: ''
    }
  }
}
</script>
