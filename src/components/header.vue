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
          background-color="#545c64"
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
      </el-menu>

  </div>
</template>


<style scoped>
.header{
  position: fixed;
  height: 100%;
}
.el-menu-vertical-demo{
  width: 15vw;
  height: 100vh;
}
</style>