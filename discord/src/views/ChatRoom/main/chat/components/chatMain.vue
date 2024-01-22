<script setup lang='ts'>
import { reactive, onMounted , nextTick, ref , watch} from 'vue';
import chatHead from "./chatHead.vue"
import type { message, information } from '@/stores/interface/information'
import {globalStore} from '@/stores/index'
import axios from '@/axios';
import http from 'axios'
import { useRouter } from "vue-router"
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import Emoji from '@/common/emoji/emoji.vue'


const route = useRouter()
const store = globalStore()
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const socket = ref<Socket | null>(null)

const init =  () => {
  state.uuid = route.currentRoute.value.params.id as string   //传入的不会是数组
  method.init_information()
  socket.value = io('http://127.0.0.1:7001/chat',{
    transports: ['polling'],
  })
  socket.value.on('connect', () => {
  socket.value.emit('join',{
    uuid:store.user_info.uuid
  })
});
  socket.value.on('privateMessage',(res:number)=>{
    if (res === 200) {
      method.init_information()
    }
  })
};
onMounted(init)



const state = reactive({
  uuid:'',                                                              // 用户自身uuid
  send_value:'',                                                        // 发送文本
  information:{} as information,                                        // 朋友信息
  message: [] as message[],                                             // 聊天信息
  // upload_picture:'',                                                    // 
  transcribe_aduio:false,                                               // 录音开始结束标记
  user_audio:'',                                                        // 录音文本
  microphone_color:'white',                                             // 录音提示
  aduio_icon:new URL('@/assets/images/audio.png',import.meta.url).href,  // 录音icon
  roomID:'',
  emoji_box:false,                                                       // 表情框显示隐藏
})


watch(()=>  route.currentRoute.value.params.id,()=>{
  init()

})





const method = reactive({
   init_information() {
     axios('/information/public',{
      data:{ uuid: state.uuid }
    }).then((res)=>{
      const data = res.data.data
      state.information = data.information
      state.information.create_time = state.information.create_time.slice(0,10)
      state.information.last_login_time = state.information.last_login_time?.slice(0,10)
      state.message = data.message
      console.log(state.message)
      state.send_value = ''
      /* 滚动条拉到最下方 */
      nextTick(()=>{
        const scroll_dom = document.getElementsByClassName('chat-record-list')[0] as HTMLElement;
        scroll_dom.scrollTop = scroll_dom.scrollHeight;
      })
      
    })
  },
  send_message(type:number) {
    axios('/message/friend',{
      data:{
        uuid:state.uuid,
        contain:state.send_value,
        message_type:type
      }
    }).then(()=>{
      method.privateMessage()
      method.init_information()
    })
  },
  privateMessage(){
    socket.value.emit('privateMessage',{
      friend_uuid: state.information.uuid,
    })
  },
  handleUploadIconClick() {
    fileInput.value!.click()
   
  },
  handleFileChange(event:Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0]
    const formData = new FormData()
    selectedFile.value =file || null
    formData.append('file',selectedFile.value as Blob)
    const otherData = {
      uuid: state.uuid,
      message_type: 1,
    }
    formData.append('uuid',otherData.uuid)
    http.post('http://127.0.0.1:7001/message/upload',formData,{
      headers: {
        authorization: sessionStorage.getItem('token'),
        token:sessionStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) =>{
      const data = res.data.data
      axios('/message/picture',{
        data,
      }).then(()=>{
        method.init_information()
        method.privateMessage()
      })
    })
  },
  send_audio() {
    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'zh-CN'
    state.transcribe_aduio = !state.transcribe_aduio
    if (state.transcribe_aduio) {
      recognition.start()
      state.microphone_color = 'red'
      console.log('录音开始')
    }else {
      recognition.stop()
      state.microphone_color = 'white'
      console.log('录音结束')
    }
    recognition.onresult = (e:any)=>{
      console.log(e.results[0][0].transcript)
      state.send_value = e.results[0][0].transcript
      method.send_message(2)
    }
  },
  play_audio(item:message){
    console.log(item.contain)
    let speech = new SpeechSynthesisUtterance()
    speech.text = item.contain
    speechSynthesis.speak(speech)
  }

})


const send_box = ref<HTMLInputElement | null >(null)
/* 聊天框插入位置选择 */
const cursor = ref(0);
const visible = ref(false)



/* 选择表情后在输入框展示 */
const emojiHandle = (item:string) => {
  /* 获取光标位置 */
  cursor.value = send_box.value?.selectionStart as number;
  const msg = state.send_value
  console.log(cursor.value)
  if (!cursor.value) {
    /* 末尾插入 */
    state.send_value += item
  } else {
    /* 中间插入 */
    state.send_value = msg.slice(0, cursor.value) + item + msg.slice(cursor.value)
    console.log(state.send_value)
  }
} 



</script>

<template>
  <el-main class="main-box">
    <div class="chat-record-list" >
      <div class="chat-header">
        <chatHead :information="state.information"/>
      </div>
      <div class="chat-list-item"  v-for="item in state.message" :key="item.id">
        <div class="send" v-if="item.sender_uuid === state.uuid && item.read !== -1">
          <el-avatar :src="state.information.avator_url" ></el-avatar>
          <div class="chat-message" >
            <div class="message-top">
              <span class="name">{{state.information.user_name}}</span>
              <span class="time">{{item.create_time}}</span>
            </div>
            <!-- 文本 -->
            <div class="message-bottom" v-if="item.message_type === 0">
              <span>{{item.contain}}</span>
            </div>
            <!-- 图片 -->
            <div class="message-bottom" v-if="item.message_type === 1">
              <img :src="item.contain" alt="" class="message-img">
            </div>
            <!-- 音频 -->
            <div class="message-bottom " v-if="item.message_type === 2">
              <el-tooltip
              :hide-after="0"
              effect="dark"
              content="点击阅读"
              placement="top"
              :enterable="false"
              >
                <img :src="state.aduio_icon" class="audio-icon" @click=method.play_audio(item)>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="send" v-if="item.sender_uuid !== state.uuid " >
          <el-avatar  :src="store.user_info.avator_url"></el-avatar>
          <div class="chat-message">
            <div class="message-top">
              <span class="name">{{store.user_info.user_name}}</span>
              <span class="time">{{item.create_time}}</span>
            </div>
            <!-- 发送文本，包含发送失败，自己可见 -->
            <div class="message-bottom" v-if="item.message_type === 0">
              <span>{{item.contain}}</span>
              <el-tooltip
              :hide-after="0"
              effect="dark"
              content="网络错误，点击重新发送"
              placement="top"
              :enterable="false"
              >
              <span class="send_error" v-show="item.read === -1">
                <el-icon   :size="20" color="rgb(242,63,36)" >
                  <Warning />
                </el-icon>
              </span>
              </el-tooltip>     
            </div>
            <!-- 图片 -->
            <div class="message-bottom" v-if="item.message_type === 1">
              <img :src="item.contain" alt="" class="message-img">
            </div>
            <!-- 音频 -->
            <div class="message-bottom " v-if="item.message_type === 2">
              <el-tooltip
              :hide-after="0"
              effect="dark"
              content="点击阅读"
              placement="top"
              :enterable="false"
              >
                <img :src="state.aduio_icon" class="audio-icon" @click="method.play_audio(item)">
              </el-tooltip>    
            </div>
          </div>
        </div>
      </div>


    </div>
    <!-- 发送消息框 -->
    <div class="chat-search-box">
      <input
        :placeholder="`消息@${state.information.user_name}`"
        v-model="state.send_value"
        @keyup.enter="method.send_message(0)"
        ref="send_box"
        
      />

      <div class="chat-icon-box">
        
        <el-tooltip
        :hide-after="0"
        effect="dark"
        content="表情"
        placement="top"
        :enterable="false"
        >
          <el-icon class="icon" :size="20" color="rgb(255,255,255)" @click="()=>{state.emoji_box = !state.emoji_box}">
            <PictureRounded />
            <Emoji v-show="state.emoji_box" @emojiHandle = 'emojiHandle' :all="true" />
          </el-icon>
        </el-tooltip>
        <el-tooltip
        :hide-after="0"
        effect="dark"
        content="点击录音，再次点击发送"
        placement="top"
        :enterable="false"
        >
          <el-icon  :size="20" :color=state.microphone_color @click="method.send_audio"><Microphone /></el-icon>
        </el-tooltip>
        <el-tooltip
        :hide-after="0"
        effect="dark"
        content="发送图片"
        placement="top"
        :enterable="false"
        > 
          <el-icon  :size="20" color="rgb(255,255,255)"  @click="method.handleUploadIconClick">
            <Picture />
            <input ref="fileInput" type="file" style="display: none" @change="method.handleFileChange">
          </el-icon>
        </el-tooltip>
      </div>
    </div>
  </el-main>
</template>

<style lang='scss' scoped>
.main-box{
 height: 100vh;
 width: 100%;
 position: relative;
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
.chat-record-list{
  height: 0; /* 或其他固定的高度，如 height: 500px; */
  min-height: calc(100% - 90px); /* 添加最小高度 */
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
.chat-list-item{
  :hover{
    background-color: #2e3035;
  }
}
.send {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #4e5058;
  
}

.chat-message{
  margin-left: 10px;
  width: 100%;
}
.message-top{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 8px;
  span{
    line-height: normal;
  }
}
.name{
  padding-right: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
}

.message-bottom{
  position: relative;
  span{
    white-space: normal;
    text-align: left;
  }
  
  .send_error{
    position: absolute;
    display: inline-block;
    right: 10px;
    font-size: 12px;
  }
  .message-img{
    height: 160px;
    width: 160px;
  }
  .audio-icon{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}


.time{
  color: #6d6f78 ;
  font-size: 12px;
  text-align: center;
}
/* 发送消息框 */
.chat-search-box{
  width: 50%;
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  background-color: #3f4147;
  border-bottom: 1.5px solid #3f4147;
  border-radius: 5px;
  // min-width: 800px;
  input{
    width: 80%;
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
  .chat-icon-box{
    display: flex;
    // align-items: center;
    .icon{
      position: relative;
    }
  }
 


}
</style>