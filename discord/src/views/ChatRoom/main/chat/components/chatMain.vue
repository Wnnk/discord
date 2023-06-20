<script setup lang='ts'>
import { reactive } from 'vue';
import chatHead from "./chatHead.vue"
const state = reactive({
  me:{id:10,name:"使用者",avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
  friend:{id:0,name:'一号朋友',avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
  friends_msg:[
    {id:0,msg:'第一条信息',sender_id:0,receiver_id:10,time:'2023/6/5'},
    {id:1,msg:"me发的信息",sender_id:10,receiver_id:0,time:'2023/6/5'},
  ],
  send_value:''
})
</script>

<template>
  <el-main class="main-box">
    <div class="chat-record-list" >
      <div class="chat-header">
        <chatHead />
      </div>
      
      <div class="chat-list-item"  v-for="item in state.friends_msg" :key="item.id">
        <div class="friend-send" v-if="item.sender_id !== state.me.id">
          <el-avatar :src="state.friend.avatar" ></el-avatar>
          <div class="chat-message" >
            <div class="message-top">
              <span class="name">{{state.friend.name}}</span>
              <span class="time">{{item.time}}</span>
            </div>
            <div class="message-bottom">
              <span>{{item.msg}}</span>
            </div>
          </div>
        </div>
        <div class="user-send" v-if="item.sender_id === state.me.id">
          <div class="user-chat-message">
            <div class="user-message-top">
              <span class="name">{{state.me.name}}</span>
              <span class="time">{{item.time}}</span>
            </div>
            <div class="user-message-bottom">
              <span>{{item.msg}}</span>
            </div>
          </div>
          <el-avatar  :src="state.me.avatar"></el-avatar>
        </div>
      </div>
    </div>
    <!-- 发送消息框 -->
    <div class="chat-search-box">
      <input
        :placeholder="`消息@${state.friend.name}`"
        v-model="state.send_value"
      />

    </div>
  </el-main>
</template>

<style lang='scss' scoped>
.main-box{
  height: 100%;
}
.chat-record-list{
  height: calc(100% - 90px);
  overflow-y: auto;
}
.chat-list-item{
  :hover{
    background-color: #2e3035;
  }
}
.friend-send {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #4e5058;
  
}
.user-send{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
  border-bottom: 1px solid #4e5058;
}

.chat-message{
  margin-left: 10px;
  width: 100%;
}
.user-chat-message{
  margin-right: 10px;
  width: 100%;
}
.name{
  padding-right: 8px;
}

.message-bottom{
  span{
    white-space: normal;
    text-align: left;
  }
}

.user-message-top{
  display: flex;
  justify-content: flex-end;
}
.time{
  color: #6d6f78 ;
}
/* 发送消息框 */
.chat-search-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  background-color: #3f4147;
  border-bottom: 1.5px solid #3f4147;
  border-radius: 5px;
  width: 95%;
  input{
    width: 80%;
    height: 100%;
    border: none;
    background-color: #3f4147;
    color: #fff;
    border-radius: 3px;
    &::placeholder{
      color: #6d6f78;
    }
  }
}
</style>