<script setup lang='ts'>
import router from "@/routers";
import {reactive } from "vue"
import { encrypt } from "@/encrypt"
import { ElMessage }  from 'element-plus'
import axios from "@/axios"
import { globalStore } from '@/stores/index'

const store_data = globalStore()
const state = reactive({
  form:{
    user_email:"deremal666@hdrlog.com",
    user_password:"2222",
  }
})





const method = reactive({
  create_account() {
    router.push("/register")
  },
  user_login() {
    const str = encrypt.encrypt(JSON.stringify(state.form))
    axios('/user/login',{
      data:{rsaParams:str}
    }).then((res)=>{
      if (res.data.code === '0') {
        ElMessage({
          message:'登陆成功',
          type: 'success'
        })
        store_data.user_info = res.data.data.result
        store_data.token = res.data.data.token;
        store_data.refreshToken = res.data.data.refreshToken
        localStorage.setItem('token',store_data.token!);
        localStorage.setItem('refreshToken',store_data.refreshToken!)
        router.push('/main/private')
      }else {
        ElMessage({
          message: `${res.data.msg}`,
          type: 'error'
        })
      }
    })
  }
})
</script>

<template>
  <div class="login">
    <div class="background">
      <img src="@/assets/images/login.jpg" alt="">
    </div>
    <div class="login-form">
      <el-form
      label-width="auto"
      class="user-form"
      label-position="top"
      require-asterisk-position="right"
      >
        <h1>欢迎回来！</h1>
        <div class="welcome">很高兴再次见到您!</div>
        <div class="form-item">
          <el-form-item 
            label="电子邮箱地址" 
            :rules="{
              required: true,
            }"
          >
            <el-input class="user-input" v-model="state.form.user_email" placeholder="deremal666@hdrlog.com/1@qq.com"></el-input>
          </el-form-item>
          <el-form-item 
            label="密码" 
            class="password"
            :rules="{
              required: true,
            }"
          >
            <el-input class="user-input " type="password" v-model="state.form.user_password" placeholder="2222"></el-input>
          </el-form-item>
          <div class="forget">忘记密码?</div>
          
          <el-button class="login-button" @click="method.user_login">登录</el-button>
          
          
          <div>
            <span class="new-account">需要新的账号?</span>
          <span class="register" @click="method.create_account">注册</span>
          </div>
        </div>

      </el-form>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.login{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.background{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
.background img{
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.login-form{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
.user-form{
  background-color: rgb(49, 51, 56);
  padding: 32px;
  h1{
    text-align: center;
    color: rgb(242, 243, 245);
    margin-bottom: 8px;
    margin-top: 0;
    font-size: 24px;
    line-height: 30px;
  }
  .welcome{
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color:rgb(181, 186, 193);
  }
}
.form-item{
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.user-input{
  width: 414px;
  height: 40px;
}
.password{
  margin-bottom: 0px !important;
}
.forget{
  width: 77px;
  height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #00A8FC;
  font-size: 16px;
  margin: 6px 0px 6px 0px;
  cursor: pointer;
}

.login-button{
  width: 414.4px;
  height: 40px;
  padding: 2px 16px;
  margin-bottom: 8px;
  background-color: #5865F2;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;

}
.new-account{
  font-size: 14px;
  line-height: 16px;
  color: #949BA4;
}
.register{
  width:28px;
  height: 16px;
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #00A8FC;
  cursor: pointer;
}
</style>