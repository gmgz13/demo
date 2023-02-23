<script setup lang="ts">

</script>

<template>
  <div class="order">
    <div class="image">
      <el-image style="width: 71vw;height: 91vh" src="src/assets/7.jpg"/>
    </div>
    <div class="login">
      <div class="title">预约购车</div>
      <div class="selected" style="display: none;">
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .order{
    width: 100%;
    height: 91vh;
    position: fixed;
    top: 9vh;
    overflow: hidden;
    z-index: -1;
    display: flex;
    background: #3c3c3b;
    .login{
      width: 29vw;
      height: 91vh;
      color: white;
      font-family: "阿里妈妈数黑体 Bold",sans-serif;
      margin-left: 1.6rem;
      .title{
        font-size: 1.4rem;
        font-weight: 600;
        margin-top: 1.6rem;
      }
    }
  }
</style>