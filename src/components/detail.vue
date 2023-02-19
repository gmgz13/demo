<script lang="ts" setup>
import {useCounterStore} from "../stores/counter";
import {storeToRefs} from "pinia";

const counter = useCounterStore()
const {car} = storeToRefs(counter)
const imageUrl = "src/assets/1.png"
const fit = "cover"


</script>

<template>
  <div class="details">
    <el-image :fit="fit" :src="imageUrl" alt="捷豹F‑TYPE" style="width: 50vw; height: 100%;"/>
    <ul>
      <li v-for="(item, i) in car.performance" :key=i class="specs__heading" style="list-style: none">
        <div class="main">{{ item.name }}</div>
        <ul>
          <li v-for="(it ,j) in item.detail" :key=j class="my_text" style="list-style: none">
            <div>{{ it.name }}</div>
            <div>{{ it.data }}</div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.details {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 1px 1px #5d5d5d;

  .specs__heading {
    border-bottom: 1px solid #5d5d5d;
    font-family: "阿里妈妈数黑体 Bold", serif;
    margin: 2.5%;
    font-size: 11px;
    color: #5d5d5d;

    .main {
      color: #444;
      margin: 5px 0;
      font-size: 13px;
      line-height: 15px;
    }

    .my_text {
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        padding: 2px 0;
      }
    }
  }

  > ul {
    width: 50vw;
    height: 100%;
  }
}

</style>