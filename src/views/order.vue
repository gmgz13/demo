<script setup lang="ts">
import {ref} from "vue";

const type = ref("")
const name = ref("")
const phone = ref()
const address = ref("")
const time = ref("")
</script>

<template>
  <div class="order">
    <div>
      <el-image style="width: 71vw;height: 91vh" src="src/assets/7.jpg"/>
    </div>
    <div class="login">
      <div class="title">预约购车</div>
      <el-select v-model="type"  placeholder="选择车型" class="select" size="default">
        <el-option
            class="option"
            v-for="item in 1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >1</el-option>
      </el-select>
      <div class="name">
        <span>姓名</span>
        <input v-model="name" class="input"/>
      </div>
      <div class="phone">
        <span>手机号码</span>
        <input v-model="phone" class="input"/>
      </div>
      <div class="address">
        <span>经销商地址</span>
        <input v-model="address" class="input"/>
      </div>
      <div class="time">
        <span>计划购车时间</span>
        <el-radio-group v-model="time" class="time_button">
          <el-radio-button label="最近一周" />
          <el-radio-button label="最近一个月" />
          <el-radio-button label="最近三个月" />
          <el-radio-button label="最近半年" />
        </el-radio-group>
      </div>
      <el-button class="submit">提交</el-button>
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
    background: white;
    .login{
      width: 30vw;
      height: 91vh;
      font-family: "阿里妈妈数黑体 Bold",sans-serif;
      margin:2.8rem 2.1rem;
      .title{
        font-size: 1.6rem;
        font-weight: 600;
        color: #333;
      }
      .select{
        margin: 1.5rem 0;
        width: 100%;
      }
      .name, .phone, .address, .time{
        color: rgba(0,0,0,0.6);
        .input{
          display: block;
          color: rgba(0,0,0,0.6);
          width: 100%;
          min-height: 2.5rem;
          line-height: inherit;
          text-align: left;
          font-family: "阿里妈妈数黑体 Bold",sans-serif;
          resize: none;
          outline: 0;
          border-radius: 0;
          border: 0;
          border-bottom: 1px solid rgba(0,0,0,0.6);
          margin-bottom: 1rem;
        }
        .time_button{
          margin: 1.5rem 0;
        }
      }
      .submit{
        color: white;
        width: 100%;
        height: 6vh;
        font-family: "阿里妈妈数黑体 Bold",sans-serif;
        background: #3c3c3b;
      }
    }
  }

</style>