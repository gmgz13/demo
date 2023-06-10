<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {getUser} from "../utils/api/getUser";
import {useCounterStore} from "../stores/counter";
import {storeToRefs} from "pinia";
import {ElMessage, ElMessageBox} from "element-plus";

const phone = ref("14747691777")

const counter = useCounterStore()
const {user} = storeToRefs(counter)
let result = ref({
    phone: '',
    age: '',
    gender: ''
})
onMounted(async () => {
    const data = await getUser(phone.value)
    result.value = data.data[0]
    console.log(result)
})

let isChange = ref(false)
const change = () => {
    isChange.value = !isChange.value
    if (!isChange.value){
        ElMessage({
            type: 'success',
            message: '修改成功',
        })
    }
}

const orders = ref([
    {
        id: '1',
        model: 'A3L Limousine 35TFSI 时尚致雅型 2022款 ',
        appearance: ' 冰川白 |  18英寸5辐V型铝合金车轮 |  LED组合后尾灯（带可变化灯光功能） |  外后视镜电动调整、带加热功能',
        interior: ' 化妆镜照明灯 |  铝饰条 |  V型压痕织物&Hoxton组合 |  黑灰 |  驾驶员座椅电动调节（带腰部支撑） |  三幅运动型多功能真皮方向盘 （带换挡拨片） |  10.25寸奥迪虚拟座舱',
        price: '¥229,800',
        address: '河北省-廊坊市'
    },
])

const cancel = () =>{
    ElMessageBox.confirm(
        '确定取消订单吗？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '取消成功',
            })
            orders.value.pop()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消',
            })
        })
}
</script>

<template>
    <div class="person">
        <div v-if="!isChange" class="top">
            <div>手机：{{ result.phone }}</div>
            <div>年龄：{{ result.age }}</div>
            <div>性别：{{ result.gender }}</div>
            <el-button color="#3c3c3b" size="small" @click="change()">修改</el-button>
        </div>
        <el-form
            v-else
            label-position="left"
            label-width="100px"
            class="form"
        >
            <el-form-item label="年龄:">
                <el-input v-model="result.age" />
            </el-form-item>
            <el-form-item label="性别:">
                <el-radio-group v-model="result.gender">
                    <el-radio label="男" />
                    <el-radio label="女" />
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button color="#3c3c3b" size="small" @click="change()">保存</el-button>
            </el-form-item>
        </el-form>
        <div class="wish_content">
            <el-card v-for="(item,i) in orders" :key="i"
                     body-style="background:'#fffff'"
                     class="card">
                <div class="card_header">
                    <div class="car_name">
                        {{ item.model }}
                    </div>
                    <div>{{ item.address }}</div>
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
                        <el-button color="#3c3c3b" size="large" @click="cancel()">取消预约</el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<style lang="less" scoped>
.person {
  width: 100%;
  height: 91vh;
  position: fixed;
  top: 9vh;
  overflow: hidden;
  z-index: -1;
  background: white;
  font-family: "阿里妈妈数黑体 Bold", serif;
  color: #5d5d5d;
  font-weight: 400;

  .top, .form{
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #e5e5e5;

      .el-form-item {
          margin-bottom: 0;
      }
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