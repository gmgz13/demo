<script lang="ts" setup>
import {ref} from "vue";

import {search} from "../utils/api/search";
import {getDetail} from "../utils/api/getDetail";
import {useCounterStore} from "../stores/counter";

let input = ref('')

let data = ref({})
const getSearch = async () => {
    const result = await search(input.value)
    data.value = result ? result : {}
}

const counter = useCounterStore()
const detail = async (id: any) => {
    const result = await getDetail(id)
    counter.$patch({
        car: result[0]
    })
}
</script>

<template>
    <el-input
            v-model="input"
            class="w-50 m-2 search_input"
            placeholder="输入需要的内容"
            size="large"
            @keyup.enter.native="getSearch()"
    />
    <div class="search">
        <el-card v-for="(item,i) in data" :key=i :body-style="{ padding: '0px' }" class="produce_card">
            <img :src="`src/assets/${item.pic}`" alt="捷豹" style="width: 30vw; background: #f0f0f0;"/>
            <div class="text">
                <div class="header">
                    <h2 class="name">{{ item.name }}</h2>
                    <p>{{ item.detail[0] }}</p>
                    <p>{{ item.detail[1] }}</p>
                </div>
                <div class="center">
                    <span class="detail" @click="detail(item._id)">了解车辆</span>
                </div>
                <div class="footer">
                    <div class="price">
                        <span class="produce_price">{{ item.price }}*起</span>
                        <el-button class="produce_button" color="#3c3c3b" size="large">预约定购</el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 93%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px #5d5d5d;
  flex-wrap: wrap;
  overflow-x: hidden;

  .produce_card {
    width: 30vw;
    height: 65vh;
    margin: 5vh 5vw;

    .text {
      font-family: "阿里妈妈数黑体 Bold ", serif;
      margin: 1.6rem;

      .header {
        padding-bottom: 1.2rem;
        border-bottom: 1px solid #dedede;
        letter-spacing: .04em;
        line-height: 1;
        font-size: 1.5rem;
        font-weight: 700;
        color: #141414;
        margin-bottom: 1.2rem;

        .name {
          margin-bottom: 1.2rem;
        }

        p {
          font-size: .6rem;
          font-weight: 500;
          color: rgba(68, 68, 68, .8);
        }
      }

      .center {
        font-size: .6rem;
        color: rgba(68, 68, 68, .8);
        font-weight: 600;
        margin-top: 20px;

        .detail {
          cursor: pointer;
        }
      }

      .footer {
        margin: 0.7rem 0;

        .price {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .produce_price {
            color: #141414;
            font-size: 1.3rem;
            font-weight: 700;
          }

          .produce_button {
            font-size: .6rem;
            font-family: "阿里妈妈数黑体 Bold ", serif;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>