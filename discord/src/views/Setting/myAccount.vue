<script setup lang='ts'>
import  {reactive} from 'vue'
const state =  reactive({
  user:{
    avatar:new URL("@/assets/images/avatar.jpg",import.meta.url).href,
    name:"广东分公司的",
    id:2032
  },
  user_set:[
    {title:"昵称",contain:"您还没有添加昵称"},
    {title:"用户名",contain:"广东分公司的"},
    {title:"电子邮件",contain:""},
    {title:"自我介绍",contain:""},
  ]
})
</script>

<template>
  <div class="account">
    <h2 class="title">我的账号</h2>
    <div class="my-account">
      <div class="banner">

      </div>
      <div class="user-info">
        <div class="user-avatar">
          <el-avatar :src="state.user.avatar"></el-avatar>
        </div>
        <div class="user-name">
          <span class="name">{{state.user.name}}</span>
          <span class="id">#{{state.user.id}}</span>
        </div>
      </div>

      <div class="user-detail">
        <div class="user-field">
          <div class="filed" v-for="item in state.user_set">
            <div class="detail">
              <h3 class="detail-title">{{item.title}}</h3>
              <span class="detail-contain">{{item.contain}}</span>
            </div>
            <el-button class="detail-button">编辑</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="underlink"></div>
   
    <div class="user-password">
      <h2 class="password-title">密码与验证</h2>
      <el-button class="password-button">更改密码</el-button>
    </div>
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
</style>