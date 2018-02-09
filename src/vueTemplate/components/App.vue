<style lang="less" scoped>
.main {
  text-align: center;
  h1 {
    font-size: 80px;
  }
  input{
    text-align: center;
    user-select: none;
    outline: none;
  }
  p {
    margin: 30px 0;
    font-size: 50px; /*px*/
  }
  img {
    margin: 40px 0;
    display: inline-block;
  }
}
</style>

<template>
  <div class="main">
    <h1>vue 模板</h1>
    <input v-model="input">
    <p>{{input}}</p>
    <img src="../images/logo.png">
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: 'hello world'
    }
  }
}
</script>

