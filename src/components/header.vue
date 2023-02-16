<script lang="ts" setup>
</script>
<template>
  <div class="header">
    <el-menu
        class="el-menu-vertical-demo"
        text-color="#fff"
        mode="horizontal"
        active-text-color="#ffd04b"
        default-active="1"
    >
      <div>
        <el-menu-item disabled><span>图标</span></el-menu-item>
      </div>
      <div class="center">
        <el-menu-item index="1">
          <span>主页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span>心愿单</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span>车型</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span>预约购车</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span>详细信息</span>
        </el-menu-item>
      </div>
      <div>
        <el-menu-item>
          <el-icon><Search style="font-size: 30px" /></el-icon>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>


<style scoped>
.header{
  position: fixed;
  opacity: 0.95;
}
.el-menu-vertical-demo{
  background: #3c3c3b;
  width: 100vw;
  height: 9vh;
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: space-between;
  border: 0;
}
.el-menu-item{
  font-size: 16px;
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 400;
  scale: 0.8;
  border-bottom: 2px solid transparent;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
  outline: 0;
  background: #3c3c3b;
  color: #ffd04b;
  border-bottom: 2px solid #ffd04b;
}
.center{
  display: flex;
  justify-content: center;
}
</style>