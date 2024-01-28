<script setup lang='ts'>
import { reactive, watch, onMounted, ref, onUnmounted } from 'vue';
import { useRoute } from "vue-router"
import axios from '@/axios'
import guildOnline from './component/guildOnline.vue'
import type { GuildChatList, MemberInfo, Channel } from './interface'
import  io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

import Emoji from '@/common/emoji/emoji.vue'

const route = useRoute()

const socket = ref<Socket | null>(null)

const init = ()=>{
  const arr = route.path.split('/')
  const group_id = arr[arr.length - 2]
  state.base_data.group_id = parseInt(group_id)
  const channel_id = arr[arr.length - 1]
  state.base_data.channel_id = channel_id

  state.send_value = '' // 清空发送框
  method.init_guildchat_list(channel_id) // 聊天列表
  method.member_status(parseInt(group_id)) // 右侧栏社区成员
  method.channel_title(channel_id) // 频道信息

  /* socket 连接 */
  // socket.value = io('ws://127.0.0.1:7001/guildChat',{
    
  // })
  // socket.value = io("http://localhost:3000",{
  //   withCredentials:true, 
  //   allowEIO3: true,
  //   extraHeaders: {
  //     "my-custom-header": "abcd"
  //   }
  // })
//   socket.value.on('connect',()=>{
//     socket.value.emit('joinChannel',{
//       channel_id,
//     })
//   })
//   socket.value.on('roomMessage',(res:number)=>{
//     if (res === 200) {
//       method.init_guildchat_list(channel_id)
//     }
//   })
}

const disconnetSocket = () => {
  socket.value.emit('leaveChannel',{
    channel_id:state.base_data.channel_id,
  })
  
}

onMounted(init)
watch(()=> route.path, ()=>{
//  disconnetSocket()
 init()
})





const state = reactive({
  origin_chat_list:[] as GuildChatList,
  member_info:[] as MemberInfo,
  channel:{} as Channel,
  send_value:'',
  author:{
    'authorization':sessionStorage.getItem('token'),
    'token':sessionStorage.getItem('token'),
  },
  base_data:{
    group_id:-1,
    message_type:1,
    channel_id:''
  },
  emoji_box:false,
})
const method = reactive({
  
  init_guildchat_list(channel_id:string){
    axios('/guild/chatlist',{
      data:{
        channel_id
      }
    }).then((res)=>{
      const data = res.data.msg.result
      state.origin_chat_list = data
      
    })
  },
  /* 同一天只显示一次 */
  isFirstDay(index:number):boolean{
    if (index === 0) {
      return true
    }else {
      const currentDate = state.origin_chat_list[index].create_time.split(' ')[0]
      const previousDate = state.origin_chat_list[index - 1 ].create_time.split(' ')[0]
      return currentDate !== previousDate
    }
  },
  member_status(group_id:number) {
    axios('/guild/memberstatus',{
      data:{
        group_id,
      }
    }).then((res)=>{
      const data = res.data.data.result
      state.member_info = []
      for (let index = 0; index < data.length; index++) {
        state.member_info.push(data[index].memberInfo)
      }
    })

  },
  channel_title(channel_id:string) {
    axios('/guild/title',{
      data:{
        channel_id,
      }
    }).then((res)=>{
      state.channel = res.data.data.channel
    })
  },
  send_message(message_type:number){
    const arr = route.path.split('/')
    const channel_id = arr[arr.length - 1]
    const group_id = arr[arr.length - 2]
    axios('/guild/chat', {
      data:{
        message_type,
        message:state.send_value,
        channel_id,
        group_id
      }
    }).then(()=>{
      state.send_value = ''
      method.init_guildchat_list(channel_id)
      method.socket_channel_message()
    })
  },
  socket_channel_message() {
    socket.value.emit('channelMessage',{
      channel_id:state.base_data.channel_id
    })
  }


})
const send_box = ref<HTMLInputElement | null >(null)
/* 聊天框插入位置选择 */
const cursor = ref(0);
/* 选择表情后在输入框展示 */
const emojiHandle = (item:string) => {
  cursor.value = send_box.value?.selectionStart as number;
  const msg = state.send_value
  if (!cursor.value) {
    /* 末尾插入 */
    state.send_value += item
  } else {
    /* 中间插入 */
    state.send_value = msg.slice(0, cursor.value) + item + msg.slice(cursor.value)
  }
} 

</script>

<template>
 
  <div class="guild-chat">
      <div class="chat-header">
        <div class="current-channel">
          <h2>#</h2>
          <span>{{state.channel.channel_name}}</span>
        </div>
      </div>
      <el-row>
        <el-col :span="20">
          <div class="channel-main">
            <!-- 频道简介 -->
            <div class="channel-default">
              <h3>欢迎来到{{state.channel.channel_name}}</h3>
              <div class="summary">这里是频道的起点</div>
            </div>
            <!-- 频道聊天 -->
            <div class="channel-chat">
              <div class="chat-box" v-for="(item,index) in state.origin_chat_list" :key="item.id">
                <div class="divider" v-if="method.isFirstDay(index)">
                  <span class="divider-content">
                    {{item.create_time}}
                  </span>
                </div>
                <!-- 频道信息栏 -->
                <div class="message-box">
                  <div class="message-main">
                    <el-avatar class="avatar" :size="40" >
                      <img :src="item.userInfo.avator_url" alt="">
                    </el-avatar>
                   
                    <div class="message-right-box" >
                      <h3 class="message-title">
                        <span class="username">{{item.userInfo.user_name}}</span>
                        <span class="timestamp">{{item.create_time.split(' ')[1]}}</span>
                      </h3>
                      <div class="message-content">
                        <span v-if="item.message_type === 0">{{item.message}}</span>
                        <img :src="item.message" v-if="item.message_type === 1">
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>



          <!-- 用户输入框 -->
          <div class="user-inner">
                
                <div class="text-input">
                  <input 
                    :placeholder="'给' + state.channel.channel_name + '发送信息'" 
                    v-model="state.send_value" 
                    @keyup.enter="method.send_message(0)"
                    ref="send_box"
                  />
                  <div class="icon-box">
                    <el-tooltip
                      :hide-after="0"
                      effect="dark"
                      content="表情"
                      placement="top"
                      :enterable="false"
                    >
                    <el-icon class="icon" :size="20" color="rgb(255,255,255)" @click="() =>{state.emoji_box = !state.emoji_box}">
                      <PictureRounded class="item"/>
                      <Emoji v-show="state.emoji_box" @emojiHandle = 'emojiHandle' :all="true" />
                    </el-icon>
                    </el-tooltip>
                    <el-upload
                      class="uploader"
                      action=" http://127.0.0.1:7001/guild/picture"
                      :headers="state.author"
                      :on-success="init"
                      :data="state.base_data"
                      :show-file-list="false"
                    >
                    <el-tooltip
                      :hide-after="0"
                      effect="dark"
                      content="发送图片"
                      placement="top"
                      :enterable="false"
                    >
                      <el-icon  :size="20"  color="rgb(255,255,255)" > <Picture class="item"/> </el-icon>
                    </el-tooltip>

                    </el-upload>


                  </div>
                </div>
          </div>
          
        </el-col>
        <el-col :span="4">
          <div class="guild-online">
            <guildOnline :info="state.member_info" v-if="state.member_info.length > 0"/>
          </div>      
          
        </el-col>
      </el-row>


      
  </div>

</template>

<style lang='scss' scoped>
.channel-main{
  margin-top: 50px;
  height: 0;  /* 或其他固定的高度，如 height: 500px; */
  min-height: calc(100% - 190px); /* 添加最小高度 */
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3f4147;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #313338;
    border-radius: 4px;
  }
}
.guild-chat{
  width: 100%;
  height: 100%;
  position: relative;
  // overflow-y: hidden;
}
.chat-header{
  height: 48px;
  width: 100%;
  position: fixed;
  top: 0;
  border-color: #313338;
  border: #484c55 1px solid;
}
.current-channel{
  display: flex;
  align-items: center;
  z-index: 10;
  h2{
    margin: 0px 10px;
    color: rgb(128, 132, 142);
  }
  span{
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    line-height: 20px;
  }
}
.channel-default{
  margin: 16px;
  h3{
    font-weight: 700;
    margin: 8px 0;
    color: #F2F3F5;
    font-size: 32px;
    line-height: 40px;
  }
  .summary{
    color: #B5BAC1;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
  }
}

.channel-chat{
  width: 100%;
}

.chat-box{
  width: 100%;
  min-height: 48px;
 /*  height: 100%; */
}

/* 聊天内容 */
/* 时间头 */
.divider{
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  z-index: 1;
  height: 0;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  -webkit-box-flex: 0;
  box-sizing: border-box;
  --divider-color:rgb(148, 155, 164);
  .divider-content{
    display: block;
    flex: 0 0 auto;
    padding: 2px 4px;
    color:rgb(148, 155, 164) ;
    background: rgb(49, 51, 56);
    line-height: 13px;
    font-size: 12px;
    margin-top: -1px;
    font-weight: 600;
    border-radius: 8px;
  }
}

/* 聊天框 */
.message-box{
  position: relative;
  width: 100%;
  margin-top: 17px;
  :hover{
    background-color: #2e3035;
    position: relative;
    z-index: 1;
  }
/*   height: 100%; */
}
.message-main{
/*   height: 0; */
/*   min-height: calc(70vh - 90px); */
  margin-top: 1.0625rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  padding-right: 48px!important;
  position: relative;
  word-wrap: break-word;
  user-select: text;
  -webkit-box-flex: 0;
  display: flex;

  .message-title{
    margin: 0;
  }
  .message-right-box{
    margin-left: 1.25rem;
    display: flex;
    flex-direction: column;
    flex: auto;
  }
  .username{
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.375rem;
    display: inline;
    position: relative;
    overflow: hidden;
    color:rgb(242, 243, 245);
    margin-right: 0.25rem;
  }
  .timestamp{
    font-size: 0.75rem;
    line-height: 1.375rem;
    color:rgb(148, 155, 164) ;
    vertical-align: baseline;
    font-weight: 500;
    height: 1.25rem;
  }

  .message-content{
    font-size: 1rem;
    line-height: 1.375rem;
    word-wrap: break-word;
    color: rgb(219, 222, 225);
    max-width: 400px;
    max-height: 300px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}


/* 用户输入框 */
.user-inner{
  position: relative;
}

.text-input{
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 40px;
  background-color: #3f4147;
  border-bottom: 1.5px solid #3f4147;
  border-radius: 5px;
  width: 98%;
  input{
    width: 90%;
    word-break: break-all;
    height: 100%;
    border: none;
    background-color: #3f4147;
    color: #fff;
    border-radius: 3px;
    border: none;
    outline: none;
    &::placeholder{
      color: #6d6f78;
    }
  }
  .icon-box{
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .item{
      margin: 0 2px;
    }
  }
}

/* 表情框 */
.emoji{
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(0,-100%);
  display: flex;
  justify-content: flex-end;
  z-index: 2;
}















.guild-online{
  margin-top: 50px;
  height: 100vh;
}
</style>