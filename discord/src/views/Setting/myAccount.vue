<script setup lang='ts'>
import  { ref } from 'vue'
import { globalStore } from '@/stores/index'
import { ElMessage } from 'element-plus'
import axios from '@/axios';
import { encrypt } from '@/encrypt';
import router from "@/routers";

const info = globalStore()

  let changeDialog = ref(false);
  const changeInfo = ref({
    nickname:info.user_info.nickname,
    username:info.user_info.user_name,
    email:info.user_info.user_email,
    note:info.user_info.note,
    password:''
  });
  /** 
   * @description 修改用户信息
   * 
   **/  
  const onSubmitInfo = async () =>{
    if(changeInfo.value.password === '') {
      ElMessage({
        message:"密码不能为空",
        type:"error"
      })
      changeDialog.value = false;
      return 
    }
    /* 数据加密 */
    const data = encrypt.encrypt(JSON.stringify(changeInfo.value));
    /* 发送请求 */
    const changeResult =  await axios('/user/changeInfo',{
      data:{data}
    })
    if(changeResult.data.data.statu !== 200) {
      /* 失败 */
      ElMessage({
        message:'密码或服务器发生错误',
        type:"error"
      })
    }else {
      ElMessage({
        message:"修改成功",
        type:"success"
      })
      /* 修改储存的用户信息 */
      const updatedInfo = changeResult.data.data.result;
      info.user_info = updatedInfo;
    }
    changeInfo.value.password = ''
    changeDialog.value = false;
  }

/**  
 * @description 密码更改
 * 
*/
let passwordDialog = ref(false);
const passwordInfo = ref({
  oldPassword:'',
  newPassword:'',
  confirmPassword:'',
})
const onSubmitPassword  = async() => {
  /* 比较两次密码 */
  if (passwordInfo.value.newPassword !== passwordInfo.value.confirmPassword) {
    ElMessage({
      message:"两次密码不一致",
      type:"error"
    })
    return
  }
  /* 加密数据 */
  const data = encrypt.encrypt(JSON.stringify(passwordInfo.value));
  /* 发送请求 */
  const res = await axios('/user/changePassword',{
    data:{data}
  })
  if(res.data.code === '0') {
    ElMessage({
      message: res.data.msg,
      type:"success",
    })
    return
  } 
  ElMessage({
    message: res.data.msg,
    type:"error",
  })
  const keys = Object.keys(passwordInfo.value) as (keyof typeof passwordInfo.value)[];
  keys.forEach(key => {
    passwordInfo.value[key] = ''
  })
  passwordDialog.value = false;
  return    
}

/** 
 * @description 退出登录
 */
const logout = async () => {
  const res = await axios('/user/logout',{})
  if(res.data.code === '0') {
    localStorage.setItem('token','')
    localStorage.setItem('globalStore','')
    localStorage.setItem('refreshToken','')
    ElMessage({
      message: res.data.msg,
      type:"success",
    })
    router.push('/');
    return
  }
  ElMessage({
    message: res.data.msg,
    type:"error",
  })
  return
}

</script>

<template>
  <div class="account">
    <h2 class="title">我的账号</h2>
    <i class="iconfont icon-cuowuguanbiquxiao-xianxingyuankuang home-icon" @click="router.push('/main/private')"></i>
    <div class="my-account">
      <div class="banner">

      </div>
      <div class="user-info">
        <div class="user-avatar">
          <el-avatar :src="info.user_info.avator_url"></el-avatar>
        </div>
        <div class="user-name">
          <span class="name">{{info.user_info.user_name}}</span>
          <span class="id">#{{info.user_info.uuid}}</span>
        </div>
      </div>

      <div class="user-detail">
        <div class="user-field">
          <div class="filed">
            <div class="detail">
              <h3 class="detail-title">昵称</h3>
              <span class="detail-contain">{{info.user_info.nickname}}</span>
            </div>
          </div>
          <div class="filed">
            <div class="detail">
              <h3 class="detail-title">用户名</h3>
              <span class="detail-contain">{{info.user_info.user_name}}</span>
            </div>
          </div>
          <div class="filed">
            <div class="detail">
              <h3 class="detail-title">电子邮箱</h3>
              <span class="detail-contain">{{info.user_info.user_email}}</span>
            </div>
          </div>
          <div class="filed">
            <div class="detail">
              <h3 class="detail-title">自我介绍</h3>
              <span class="detail-contain">{{info.user_info.note || '这个人很懒没有留下什么'}}</span>
            </div>
          </div>
          <el-button class="detail-button" @click="changeDialog =true">编辑</el-button>
        </div>
      </div>
    </div>

    <!-- 更改dialog -->
    <el-dialog v-model="changeDialog" center width="40%">
        <div class="header">
          <div class="header-title">更改用户信息</div>
          <div class="header-tip">输入新的信息与现有密码</div>
        </div>
        <el-form 
          :model="changeInfo" 
          label-position = "top"
          class = "dialog-form"
          label-width = "20px"
        >
          <el-form-item label="用户名">
            <el-input v-model="changeInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="changeInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="changeInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="自我介绍">
            <el-input v-model="changeInfo.note"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="changeInfo.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmitInfo">保存</el-button>
          </el-form-item>
        </el-form>


    </el-dialog>

    <div class="underlink"></div>
   
    <div class="user-password">
      <h2 class="password-title">密码与验证</h2>
      <el-button class="password-button" @click="passwordDialog = true">更改密码</el-button>
    </div>

    <!-- 更改密码 -->
    <el-dialog v-model="passwordDialog" width="40%" center>
      <div class="header">
        <div class="header-title">更改用户密码</div>
      </div>
      <el-form
        :model="passwordInfo"
        label-position = "top"
        class = "dialog-form"
        label-width = "20px"
      >
        <el-form-item label="原密码">
          <el-input v-model="passwordInfo.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passwordInfo.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="passwordInfo.confirmPassword" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmitPassword">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="underlink"></div>

    <!-- 登出 -->
    <el-button type="danger" class="account-out" @click="logout">登出账号</el-button>
  </div>
  
</template>

<style lang='scss' scoped>
.account{
  position: relative;
  background-color: rgb(57, 58, 58);
  height: 100%;
  padding: 60px 40px 40px 80px;
  overflow-y: auto;
  &::-webkit-scrollbar {
   width: 2px; 
   height: 5px;
  }
}
.home-icon{
  position: absolute;
  right: 20%;
  font-size: 48px;
}
.title{
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #F2F3F5;
  margin-top: 0;
}
.my-account{
  position: relative;
  background-color: #1E1F22;
  width: 660px;
  border-radius: 0 0 6px 6px;
  padding-bottom: 16px;
}
.banner{
  background-color: rgb(61, 164, 92);
  box-sizing: border-box;
  height: 100px;
  min-height: 100px;
  border-radius: 4px 4px 0 0 ;
  width: 100%;
}
.user-info{
  position: relative;
  height: 72px;
  width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 16px 16px 0 120px;
  box-sizing: border-box;
  .name{
    box-sizing: border-box;
    -webkit-box-flex: 0;
    flex:0 1 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #F2F3F5;
    line-height: 24px;
    font-size: 20px;
    font-weight: 600;
  }
  .id{
    box-sizing: border-box;
    color: #B5BAC1;
    line-height: 24px;
    font-size: 20px;
    font-weight: 600;
  }
}
.user-avatar{
  width: 90px;
  height: 90px;
  position: absolute;
  top: -20px;
  left: 22px;
  border-radius: 50%;
  background-color: #1E1F22;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-avatar{
    width: 80px;
    height: 80px;
  }
}
.user-detail{
  border-radius: 8px;
  padding: 16PX;
  margin: 8px 16px 16px;
  background-color: rgb(43, 45, 49);
}
.user-field{
  border-radius: 8px;
  
}
.filed{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
}
.detail{
  display: flex;
  flex:1 1 auto;
  overflow: hidden;
  margin-right: 16px;
  flex-direction: column;
  .detail-title{
    margin: 0 0 4px 0;
    box-sizing: border-box;
    color: #B5BAC1;
    font-size: 12px;
  }
  .detail-contain{
    color: #F2F3F5;
    box-sizing: border-box;
    font-size: 16px;

  }
}
.detail-button{
  background-color: #4E5058;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
}
/* dialog样式 */
:deep(.el-dialog){
  background-color: #4e5058 ;
  .header{
    .header-title{
      font-weight: 700;
      text-align: center;
      font-size: 24px;
      line-height: 30px;
      color: #FFF;
    }
    .header-tip{
      margin-top: 8px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 16px;
      line-height: 1.25;
      font-weight: 400;
      color: #B5BAC1;
    }
  }

  .dialog-form{
    label{
      color: #B5BAC1;
    }

    .el-input__wrapper{
      background-color: #1E1F22;
      box-shadow: none;
    }
    .el-input__inner{
     font-size: 16px;
     box-sizing: border-box;
     border-radius: 3px;
     color: rgb(219, 222, 225);
    }
  
  }

}
.underlink{
  border: rgba(78, 80, 88, 0.48) solid 0.05px;
  width: 100%;
  margin-top: 40px;
}
.password-title{
  box-sizing: border-box;
  color: #F2F3F5;
  font-size: 20px;
  margin-right: 20px;
}
.password-button{
  background-color: #5865F2;
  color: #FFFFFF;
  border: none;
}
.account-out{
  margin-top: 20px;
}
</style>