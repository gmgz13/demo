<script lang="ts" setup>
import Detail from "./detail.vue";
import {ref} from "vue";
import Models from "./models.vue";

//控制组件
const details = ref(false)
const showDetails = () => {
  details.value = true
}
const hideDetails = () => {
  details.value = false
}

const model = ref(false)
const shouModels = () => {
  model.value = true
}
const hideModels = () => {
  model.value = false
}
</script>
<template>
  <div class="header">
    <el-menu
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
        default-active="1"
        mode="horizontal"
        text-color="#fff"
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
        <el-menu-item index="3" @mouseenter="shouModels()">
          <span>车型</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span>预约购车</span>
        </el-menu-item>
        <el-menu-item index="5" @mouseenter="showDetails()">
          <span>详细信息</span>
        </el-menu-item>
      </div>
      <div>
        <el-menu-item>
          <el-icon>
            <Search style="font-size: 30px"/>
          </el-icon>
        </el-menu-item>
      </div>
    </el-menu>
    <div v-show="details" class="my_details" @mouseleave="hideDetails()">
      <Detail/>
    </div>
    <div v-show="model" class="my_models" @mouseleave="hideModels()">
      <Models/>
    </div>
  </div>
</template>


<style lang="less" scoped>
.header {
  position: fixed;

  .el-menu-vertical-demo {
    background: #3c3c3b;
    width: 100vw;
    height: 9vh;
    display: flex;
    margin: 0;
    align-items: center;
    justify-content: space-between;
    border: 0;

    .el-menu-item {
      font-size: 16px;
      font-family: "阿里妈妈数黑体 Bold", serif;
      font-weight: 400;
      scale: 0.8;
      border-bottom: 2px solid transparent;
    }

    .center {
      display: flex;
      justify-content: center;
    }
  }

  .my_details, .my_models {
    position: absolute;
    background: white;
    width: 100vw;
    height: 80vh;
    top: 9vh;
  }
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  outline: 0;
  background: #3c3c3b;
  color: #ffd04b;
  border-bottom: 2px solid #ffd04b;
}
</style>