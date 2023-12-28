<script setup lang='ts'>
import {reactive , onMounted} from "vue"
import friendDisplay from "./friendDisplay.vue";

import axios from "@/axios";
import type { Friend } from '@/stores/interface/friendsList'

const state = reactive({
  statu_index:2,
  friend_list:[] as Friend[], /* 保存axios接受原始数组 */
  display_list:[] as Friend[], /* 状态数组 */
  email_box:false,
})
const method = reactive({
 check_statu(index:number) {
  state.statu_index = index
  if(index !== 2) {
    if (index === 1) {
      state.display_list = state.friend_list.filter(item => item.status === 1)
    }else {
      state.display_list = state.friend_list.filter(item => item.relationship === index)
    }
   
  }else {
    state.display_list = state.friend_list
  }
  
 },
 init_friendlist() {
    axios('user/friend',{}).then((res)=>{
      const data = res.data.data.result as Friend[];
      data.forEach((item)=>{
       state.friend_list.push(item)
      })
      state.display_list = state.friend_list
    })
  },
})

onMounted(()=>{
  method.init_friendlist()
})
</script>

<template>
  <el-container>
     <el-header class="friends-header">
      <el-row>
        <el-col :span="19" class="header-left">
          <div class="header-first">
            <span class="frineds-title">
              <el-icon :size="24" color="rgb(128, 132, 142)"><Avatar /></el-icon>
              好友
            </span>
            <div class="divider-q3P9HC"></div>
            <span :class="{'is-active' : state.statu_index === 2}" @click="method.check_statu(2)"> 全部 </span>
            <span :class="{'is-active' : state.statu_index === 1}" @click="method.check_statu(1)"> 在线 </span>
            <span :class="{'is-active' : state.statu_index === 3}" @click="method.check_statu(0)">
              待定 
              <i class="msg-num"></i>
            </span>
            <span :class="{'is-active' : state.statu_index === 4}" @click="method.check_statu(-1)"> 已屏蔽 </span>
            <span :class="{'is-active' : state.statu_index === 5}"> 添加好友 </span>
          </div>
        </el-col>
        <el-col :span="5" class="header-right">
          <div class="header-second">
            <el-tooltip
              :hide-after="50"
              class="box-item"
              effect="dark"
              content="创建群组私聊"
              placement="bottom"
            >
              <el-icon :size="24" color="rgb(181, 186, 193)"><ChatSquare /></el-icon>
            </el-tooltip>

            <div class="divider-q3P9HC"></div>

            <el-tooltip
              :hide-after="50"
              class="box-item"
              effect="dark"
              content="收信箱"
              placement="bottom"
            >
              <el-icon :size="24" color="rgb(181, 186, 193)" @click="state.email_box = !state.email_box"><Message /></el-icon>
            </el-tooltip>
            
            <el-tooltip
              :hide-after="50"
              class="box-item"
              effect="dark"
              content="帮助"
              placement="bottom"
            >
              <el-icon :size="24" color="rgb(181, 186, 193)"><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>

      <div class="email-box" v-if="state.email_box">
        <div class="email-box-header">
          <el-icon :size="24" color="rgb(181, 186, 193)"><Message /></el-icon>
          <h1>收件箱</h1>
        </div>
        <div class="email-box-contain">
            <el-empty description="你已搞定一切" :image-size="100" />
        </div>
      </div>
    </el-header>
    <!-- 朋友列表信息 -->
    <el-row class="box-main-mid-right">
      <el-col :span="17">
        <el-container>
          <el-main class="friends-status">
              <el-row class="friends-item-list">
                <friendDisplay :friend_list ="state.display_list"/>
              </el-row>
          </el-main>
        </el-container>
      </el-col>
      <!-- 最右侧 -->
      <el-col :span="7">
        <el-container>
          <el-main class="box-friend-default">
            <h2>当前的活动</h2>
            <div class="status">
              <h3>现在很安静...</h3>
              <p>当好友开始活动时（比如玩游戏或进行语音聊天的时候），他们的状态都会显示在这里！</p>
            </div>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </el-container>
 
</template>

<style lang='scss' scoped>
.friends-header{
  height: 48px;
  
}


.frineds-title{
  color:rgb(242, 243, 245);
  display: flex;
  justify-content: center;
}
.header-first{
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: space-evenly;
  width: 440px;
  /* 在线、全部、待定等切换栏样式 */
  span{
    display: flex;
    align-items: center;
    &:first-child{
      font-size: 16px;
      font-weight: bold;
      color: #f2f3f5;
    }
    &:not(:first-child){
      padding: 1.8px 8px;
      font-size: 16px;
      color: #b5bac1;
      &:hover:not(:first-child :last-child){
        background-color: #393c41;
        border-radius: 3px;
        cursor: pointer;
        color:#d6d6dc;
      }
      &:last-child{
        background-color: #248046;
        border-radius: 3px;
        color: #fffff3;
        cursor: pointer;
      }
    }
    
  }
}

/* 状态栏被选中 */
.is-active {
  background-color: #43444b;
  border-radius: 3px;
  color: #f2f3f5 !important;
}

/* 顶部栏右侧 */


.header-second{
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  .el-icon{
    margin: 0 10px;
    font-size: 17.5px;
    color:#b5bac1;
    &:hover{
      background-color: #393c41;
      border-radius: 3px;
      cursor: pointer;
      color: #d6d6dc;
    }
  }
}
/* 分割线 */
.divider-q3P9HC {
    width: 1px;
    height: 24px;
    margin: 0 8px;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    background: #3f4147;
}

.box-main-mid-right{
  position: relative;
  height: 100%;
  padding: unset;
  background-color: #313338;
  
}
.friends-status{
  padding-top: unset;
  position: absolute;
  width: 820px;
  height: 100%;
  z-index: 1;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2b2d31;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #313338;
    border-radius: 4px;
  }
}
.friends-item-list{
  margin-bottom: 120px !important;
}

/* 默认空白 */
.box-friend-default{
  color: rgb(242, 243, 245);
}
.status{
  h3{
    font-size: 16px;
    text-align: center;
  }
}


/* 收件箱 */
.email-box{
  width: 35vw;
  max-width: 600px;
  min-width: 480px;
  max-height: 80vh;
  position: absolute;
  top: 50px;
  right: 100px;
  z-index: 30;
}
.email-box-header{
  display: flex;
  align-items: center;
  background-color: #1E1F22;
  border-radius: 10px 10px 0 0;
  h1{
    margin-left: 8px;
    color: #DBDEE1;
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    flex-grow: 1;
  }
}
.email-box-contain{
  min-width: 480px;
  height: 400px;
  border-radius: 0 0 10px 10px;
  background-color: #303133;
}




</style>