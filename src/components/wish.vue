<script lang="ts" setup>
import {ref, watch} from "vue";
import router from "../router";
import {useCounterStore} from "../stores/counter";
import {storeToRefs} from "pinia";
import {wish} from "../utils/api/Wish";
import {ElMessage} from "element-plus";

const counter = useCounterStore()
const {isLogin, user} = storeToRefs(counter)
const wishes = ref([
    {
        id: '1',
        model: 'A3L Limousine 35TFSI 时尚致雅型 2022款 ',
        appearance: ' 冰川白 |  18英寸5辐V型铝合金车轮 |  LED组合后尾灯（带可变化灯光功能） |  外后视镜电动调整、带加热功能',
        interior: ' 化妆镜照明灯 |  铝饰条 |  V型压痕织物&Hoxton组合 |  黑灰 |  驾驶员座椅电动调节（带腰部支撑） |  三幅运动型多功能真皮方向盘 （带换挡拨片） |  10.25寸奥迪虚拟座舱',
        price: '¥229,800'
    },
    {
        id: '2',
        model: 'A3L Limousine 35TFSI 时尚致雅型 2022款 ',
        appearance: ' 冰川白 |  18英寸5辐V型铝合金车轮 |  LED组合后尾灯（带可变化灯光功能） |  外后视镜电动调整、带加热功能',
        interior: ' 化妆镜照明灯 |  铝饰条 |  V型压痕织物&Hoxton组合 |  黑灰 |  驾驶员座椅电动调节（带腰部支撑） |  三幅运动型多功能真皮方向盘 （带换挡拨片） |  10.25寸奥迪虚拟座舱',
        price: '¥229,800'
    },
    {
        id: '3',
        model: 'A3L Limousine 35TFSI 时尚致雅型 2022款 ',
        appearance: ' 冰川白 |  18英寸5辐V型铝合金车轮 |  LED组合后尾灯（带可变化灯光功能） |  外后视镜电动调整、带加热功能',
        interior: ' 化妆镜照明灯 |  铝饰条 |  V型压痕织物&Hoxton组合 |  黑灰 |  驾驶员座椅电动调节（带腰部支撑） |  三幅运动型多功能真皮方向盘 （带换挡拨片） |  10.25寸奥迪虚拟座舱',
        price: '¥229,800'
    }
])

watch(isLogin, async () => {
    if (isLogin.value) {
        console.log(isLogin.value)
        const result = await wish(user.value.data.wishes)
        console.log(result)
    }
})


//跳转登录
const login = () => {
    router.push("/login")
}

const deleteWish = (id:string) => {
    ElMessage({
        type: 'success',
        message: '删除成功',
    })
    wishes.value.pop()
}

const open = () =>{
    router.push("/person")
}
const order = () =>{
    router.push("/order")
}
</script>

<template>
    <div class="wish">
        <div class="wish_header">
            <button v-show="!isLogin" class="login_button" @click="login()">登录</button>
            <button v-show="isLogin" class="login_button" @click="open()">14747691777</button>
        </div>
        <!--    有心愿单时显示  -->
        <div v-if="!isLogin || !wishes.length" class="none">
            <span v-if="!isLogin">您还没有登录,请登录查看心愿单~</span>
            <span v-else v-if="!wishes.length">您还没有保存的心愿单，快去配置您的爱车~</span>
        </div>
        <div class="wish_content">
            <el-card v-for="(item,i) in wishes" v-show="isLogin && wishes.length" :key="i"
                     body-style="background:'#fffff'"
                     class="card">
                <div class="card_header">
                    <div class="car_name">
                        {{ item.model }}
                    </div>
                    <div>
                        <el-popconfirm
                            confirm-button-text="是的"
                            cancel-button-text="取消"
                            title="确定要删除吗？"
                            @confirm="deleteWish(item._id)"
                        >
                            <template #reference>
                                <el-icon>
                                    <Delete/>
                                </el-icon>
                            </template>
                        </el-popconfirm>
                    </div>
                </div>
                <div class="card_detail">
                    <el-image src="src/assets/0004.jpg" style="width: 25vw; background: #f0f0f0;"/>
                    <div class="detail_context">
                        <div>
                            外观<span>{{ item.appearance }}</span>
                        </div>
                        <div>
                            内饰<span>{{ item.interior }}</span>
                        </div>
                    </div>
                </div>
                <div class="card_footer">
                    <div class="price">
                        {{ item.price }}
                        <span>市场指导价</span>
                    </div>
                    <div>
                        <el-button color="#3c3c3b" size="large" @click="order()">去下单</el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<style lang="less" scoped>
.wish {
  width: 100%;
  height: 100%;
  font-family: "阿里妈妈数黑体 Bold", serif;
  background: #f5f5f5;
  overflow: scroll;
  overflow-x: hidden;


  .wish_header {
    position: absolute;
    top: 1rem;
    right: 3rem;

    .login_button {
      border: 0;
      font-family: "阿里妈妈数黑体 Bold", serif;
      color: #5d5d5d;
      font-weight: 400;
      background: white;
      cursor: pointer;
    }
  }

  .none {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30vh;
    font-weight: 400;
    color: #666;
  }

  .wish_content {
    position: relative;

    .card {
      margin: 5vh 5vw;
      border-radius: 0;
      box-shadow: none;

      .card_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        padding: 1.15rem;

        .car_name {
          font-size: 1.25rem;
          color: #000;
        }
      }

      .card_detail {
        display: flex;
        align-items: center;
        padding: 1.15rem;

        .detail_context {
          height: 25vh;
          color: #000;
          font-size: 1.15rem;
          font-weight: 400;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          div > span {
            font-size: 0.8rem;
            padding: 0 0.5rem;
            color: #000000a6;
          }
        }
      }

      .card_footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.15rem;
        border-top: 1px solid #e5e5e5;

        .price {
          font-size: 1.25rem;
          color: #000;
          font-weight: 700;

          span {
            font-size: 0.9rem;
            color: #000000a6;
            margin-left: 1.15rem;
          }
        }
      }
    }
  }
}

/deep/ .el-card__body {
  padding: 0;
}
</style>