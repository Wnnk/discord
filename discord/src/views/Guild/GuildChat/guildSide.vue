<script setup lang='ts'>
import { reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from '@/axios';
import type { ChannelList, Group } from './interface'
const route = useRoute()
const state = reactive({
  group_id:'' as string,
  channel_hidden:false,
  channel_list:[] as ChannelList,
  group:{} as Group
})
const init = function (){
  const arr = route.path.split('/')
  state.group_id = arr[arr.length - 2]
  method.getchannel()
}
onMounted(init)
watch(()=>  route.path,()=>{
  init()
})



const method =  reactive({
  getchannel() {
    axios('guild/channelSilde', {
      data:{
        group_id:state.group_id
      }
    }).then((res)=>{
      const data = res.data.data
      state.group = data.group
      state.channel_list = data.channel
    })
  }
})
</script>

<template>
  <div class="guild-side">
    <el-header>
      <div class="server-header">
        <div class="header-title">{{state.group.group_name}}的服务器</div>
      </div>
    </el-header>
    <div class="underlink"></div>
    <div class="channel-list">
      <div class="guild-channel">
        <img src="@/assets/images/down.png"  v-if="state.channel_hidden === false" @click="state.channel_hidden = !state.channel_hidden">
        <img src="@/assets/images/right.png" v-if="state.channel_hidden === true" @click="state.channel_hidden = !state.channel_hidden">
        <div class="channel">
          社区频道
        </div> 
      </div>
      <template v-if="!state.channel_hidden">
        <div class="channel-name" v-for="item of state.channel_list" :key="item.channel_id">
          <h2>#</h2>
          <span>{{item.channel_name}}</span>
        </div>
      </template>
     
      
    </div>
  </div>
</template>

<style lang='scss' scoped>
.server-header{
  height: 48px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-title{
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  color: #F2F3F5;
}
.underlink{
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  font-size: 100%;
  vertical-align: baseline;
}
.guild-channel{
  img{
    width: 12px;
    height: 12px;
    margin: 2px 6px 0  0;
  }
  display: flex;
}
.channel{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: #949BA4;
  
}
.channel-name{
  height: 34px;
  display: flex;
  align-items: center;
  &:hover{
    background-color:  rgb(181, 186, 193,0.2);
    border-radius: 8px;
  }
  h2{
    color: rgb(128, 132, 142);
    margin: 0px 10px;
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
</style>