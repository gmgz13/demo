<script lang="ts" setup>
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";


const type = ref("")
const name = ref("")
const phone = ref()
const address = ref("")
const time = ref("")

const mode = ref([
    {
        value:"F‑TYPE 75周年典藏版",
        label:"F‑TYPE 75周年典藏版"
    },
    {
        value:"F‑TYPE",
        label:"F‑TYPE"
    },
    {
        value:"阿斯顿马丁DB11",
        label:"阿斯顿马丁DB11"
    },
])
//获取定位
//Geolocation获取当前位置
function getNavigatorGeoLocation(){
    //判断浏览器是否支持geolocation
    if(navigator.geolocation){
        //参数
        let options={
            enableHighAccuracy:true, //是否启用高精确度模式
            maximumAge:1000, //浏览器重新获取位置信息的时间间隔
            timeout:15000,//请求超时时间 (15s)
        }

        //分别为成功回调函数，失败回调函数，参数
        //该方法请求一次
        navigator.geolocation.getCurrentPosition(success,error,options)

        //请求多次，监听地理位置变化（根据需求看使用哪个）这里调用会返回一个数字 watchId
        //navigator.geolocation.watchPosition(success,error,options)

        //清除监听
        //navigator.geolocation.clearWatch(watchId)

    }else{
        //浏览器不支持geolocation
        console.log("当前系统不支持GPS API")

    }

}
//请求成功的回调
function success(position){
    console.log(position)
    console.log('经度='+position.coords.longitude)
    console.log('纬度='+position.coords.latitude)
    console.log('位置精度='+position.coords.accuracy )
    console.log('海拔='+position.coords.altitude )
    console.log('方向='+position.coords.heading )
    console.log('速度='+position.coords.speed)
}

//请求失败的回调
function error(error){
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log('定位失败,用户拒绝请求地理定位')
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('定位失败,暂时获取不到位置信息')
            break;
        case error.TIMEOUT:
            console.log('定位失败,请求获取用户位置超时')
            break;
        case error.UNKNOWN_ERROR:
            console.log('定位失败,定位系统失效')
            break;
    }
}
const submit = () =>{
    ElMessageBox.confirm(
        '确认信息无误继续提交吗？',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '提交成功',
            })
        })
}


</script>

<template>
  <div class="order">
    <div>
      <el-image src="src/assets/7.jpg" style="width: 71vw;height: 91vh"/>
    </div>
    <div class="login">
      <div class="title">预约购车</div>
      <el-select v-model="type" class="select" placeholder="选择车型" size="default">
        <el-option
            v-for="item in mode"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            class="option"
        >
        </el-option>
      </el-select>
      <div class="name">
        <span>姓名</span>
        <input v-model="name" class="input"/>
      </div>
      <div class="phone">
        <span>手机号码</span>
        <input v-model="phone" class="input"/>
      </div>
      <div class="address" @click="getNavigatorGeoLocation()">
        <span>经销商地址</span>
        <input v-model="address" class="input"/>
      </div>
      <div class="time">
        <span>计划购车时间</span>
        <el-radio-group v-model="time" class="time_button">
          <el-radio-button label="最近一周"/>
          <el-radio-button label="最近一个月"/>
          <el-radio-button label="最近三个月"/>
          <el-radio-button label="最近半年"/>
        </el-radio-group>
      </div>
      <el-button class="submit" @click="submit()">提交</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.order {
  width: 100%;
  height: 91vh;
  position: fixed;
  top: 9vh;
  overflow: hidden;
  z-index: -1;
  display: flex;
  background: white;

  .login {
    width: 30vw;
    height: 91vh;
    font-family: "阿里妈妈数黑体 Bold", sans-serif;
    margin: 2.8rem 2.1rem;

    .title {
      font-size: 1.6rem;
      font-weight: 600;
      color: #333;
    }

    .select {
      margin: 1.5rem 0;
      width: 100%;
    }

    .name, .phone, .address, .time {
      color: rgba(0, 0, 0, 0.6);

      .input {
        display: block;
        color: rgba(0, 0, 0, 0.6);
        width: 100%;
        min-height: 2.5rem;
        line-height: inherit;
        text-align: left;
        font-family: "阿里妈妈数黑体 Bold", sans-serif;
        resize: none;
        outline: 0;
        border-radius: 0;
        border: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.6);
        margin-bottom: 1rem;
      }

      .time_button {
        margin: 1.5rem 0;
      }
    }

    .submit {
      color: white;
      width: 100%;
      height: 6vh;
      font-family: "阿里妈妈数黑体 Bold", sans-serif;
      background: #3c3c3b;
    }
  }
}

</style>