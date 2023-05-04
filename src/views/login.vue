<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {login} from "../utils/api/login";
import axios from "axios";
import {useCounterStore} from "../stores/counter";
import router from "../router";
import {storeToRefs} from "pinia";


const phone = ref('')
const code = ref('')

//获取验证码
let check = ref(true)
let time = ref(60)
const send = () => {
  check.value = !check.value
  let timer = setInterval(() => {
    if (time.value > 0) {
      time.value--
    } else {
      clearInterval(timer)
      time.value = 60
      check.value = !check.value
    }
  }, 1000)
}

const counter = useCounterStore()
const { isLogin } = storeToRefs(counter)
const getLogin = () =>{
    const data  = {
        phone:phone.value,
        password:code.value
    }

    axios.post("http://localhost:3000/api/login", data).then(
        res=>{
            if (res.status ==200){
                counter.user  = res
                isLogin.value = true
                router.push("/home")
            }

        }
    )


}
</script>

<template>
  <div class="login">
    <el-image src="src/assets/兰博基尼.jpg" style="width: 100vw; height: 91vh"/>
    <el-card class="box-card">
      <h2>
        欢迎使用
      </h2>
      <div class="login_center">
        <div class="phone">
          <span>手机号</span>
          <input v-model="phone" class="input" placeholder="请输入手机号"/>
        </div>
        <div class="code">
          <span>验证码</span>
          <input v-model="code" class="input" placeholder="请输入验证码"/>
          <el-button v-show="check" class="check" color="#3c3c3b" @click="send()">获取验证码</el-button>
          <el-button v-show="!check" class="check" color="#3c3c3b" loading>{{ time }}s</el-button>
        </div>
      </div>
      <div class="login_foot">
        <el-button class="login_button" color="#3c3c3b" size="large" @click="getLogin()">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.login {
  position: absolute;
  top: 9vh;
  width: 100vw;
  height: 91vh;
  overflow: hidden;
  font-family: "阿里妈妈数黑体 Bold", sans-serif;

  .box-card {
    position: absolute;
    top: 15vh;
    left: 10vw;
    width: 25vw;
    height: 60vh;
    border-radius: 0;

    h2 {
      margin: 1rem;
    }

    .login_center {
      margin: 2rem 1.5rem;

      .phone, .code {
        color: rgba(0, 0, 0, 0.7);

        .input {
          display: block;
          color: rgba(0, 0, 0, 0.6);
          width: 100%;
          min-height: 2.5rem;
          text-align: left;
          font-family: "阿里妈妈数黑体 Bold", sans-serif;
          border-radius: 0;
          border: 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.6);
          margin-bottom: 1rem;
        }

        .check {
          font-size: 0.6rem;
          font-family: "阿里妈妈数黑体 Bold ", serif;
          font-weight: 600;
          width: 5rem;
          position: absolute;
          right: 2.5rem;
          top: 40%;
        }
      }
    }

    .login_foot {
      display: flex;
      justify-content: center;

      .login_button {
        width: 15vw;
        height: 6vh;
        font-size: 1rem;
        font-family: "阿里妈妈数黑体 Bold ", serif;
        font-weight: 600;
      }
    }
  }
}
</style>