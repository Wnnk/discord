<script setup lang='ts'>
import router from '@/routers';
import { reactive, ref  } from 'vue';
import axios from "@/axios"
import { encrypt } from "@/encrypt"
import { ElMessage }  from 'element-plus'




const state = reactive({
  form:{
    user_name:"1111",
    user_password:"1111",
    user_email:"1577268480@qq.com",
    email_captcha:'',
  },
  is_vaild_email:true,
  is_vdild_password:true,

})

const method = reactive({
  is_email(email:string) {
      const email_regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
      state.is_vaild_email =  email_regex.test(email.trim())
  },
  // is_password(password:string) {
  //   const regex = /^[a-zA-Z][a-zA-Z0-9.-]{7,}$/
  //   state.is_vdild_password = regex.test(password.trim())
  // },
  has_account() {
    router.push('/login')
  },
  user_register() {
    // 密码加密
    const str = encrypt.encrypt(JSON.stringify(state.form))
    axios('/user/register',{
      data:{resParams:str}
    }).then((res)=>{
      if(res.data.code === '0') {
        ElMessage({
          message:'注册成功',
          type:'success'
        })
        router.push('/login')
      } else {
        ElMessage({
          message: `${res.data.msg}`,
          type: 'error'
        })
      }
    })
    
  }
})


const is_time = ref(false);
const time = ref(0);


/**  
 * @description: 发送验证码
 * 
*/
const send_captha = async () => {
  if (time.value > 0) return
  const code = await axios('/user/captcha',{
    data:{
      email:state.form.user_email
    }
  })
  intervaltime();
}

/**
 * @description: 验证码倒计时
 *  */
const intervaltime = () => {
  /* 重新发送时间没超过60s */
  if(time.value > 0) return;
  /* 重新发送，开始计时 */
  time.value = 60;
  is_time.value = true;
  const interval = setInterval(() => {
    if(time.value > 0) {
      time.value--
    }else {
      clearInterval(interval)
      is_time.value = false;
    }
  },1000)
  
}

</script>

<template>
  <div class="register">
    <div class="background">
      <img src="@/assets/images/login.jpg">
    </div>
    <div class="form">
      <el-form
        class="user-form"
        label-position="top"
        label-width="auto"
      >
        <h1>创建一个账号</h1>
        <div class="form-item">
          <el-form-item
            label="电子邮件"
          >
            <span v-show="state.is_vaild_email === false" class="is-vaild">请输出正确的邮箱格式</span>
            <el-input v-model="state.form.user_email" @blur="method.is_email(state.form.user_email)"></el-input>
          </el-form-item>

          <el-form-item
            label="用户名"
          >
            <el-input v-model="state.form.user_name" ></el-input>
          </el-form-item>

          <el-form-item
            label="密码"
          >
            <span  class="is-vaild" v-show="state.is_vdild_password === false">密码长度大于7且开头为字母</span>
            <!-- @blur="method.is_password(state.form.user_password)" -->
            <el-input type="password" v-model="state.form.user_password" >
            </el-input>
          </el-form-item>

          <el-form-item
            label="邮箱验证码"
          >
            <el-input v-model="state.form.email_captcha"></el-input>
            <el-button class="get-code" @click="send_captha" :disabled="is_time">{{ is_time  ? `重新发送(${time})` : '获得验证码'}}</el-button>
          </el-form-item>


        </div>

        <div>
          <el-button class="register-button" @click="method.user_register">继续</el-button>
          <span class="login" @click="method.has_account">已经拥有账号?</span>
        </div>
        
      </el-form>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.register{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
.form{
  width: 416px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 99;
  
}
.user-form{
  width: 100%;
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
  .user-input{
    width: 414px;
    height: 40px;
  }
  .get-code{
    margin-top: 5px;
  }
}
.register-button{
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
.login{
  height: 16px;
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #00A8FC;
  cursor: pointer;
}

.is-vaild{
  position: absolute;
  right: 0px;
  top: -32px;
  font-size: 12px;
  color: red;
}
</style>