<script lang="ts" setup>
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<template>
  <div class="header">
    <el-menu
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item index="1">
        <span>登录</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span>购物车</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span>我的订单</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>搜索</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span>预约购车</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>


<style scoped>
.header{
  position: fixed;
  opacity: 0.95;
}
.el-menu-vertical-demo{
  background-image: linear-gradient(to right, black 0%,#434343 100%);
  width: 20vw;
  height: 100vh;
  border: 0;
}
.el-menu-item{
  font-size: 16px;
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 400;
}
</style>