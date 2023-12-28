<script setup lang='ts'>
import leftSide from "@/views/ChatRoom/aside/leftSide.vue"
import chatIndex from "@/views/ChatRoom/main/chat/chatIndex.vue"
import channelSide from "@/views/ChatRoom/channelSide/index.vue"
import {useRoute} from 'vue-router'

const route = useRoute()





</script>

<template>
  <div class="room">
    <el-container>
      <el-aside width="72px" class="aside">
        <leftSide ></leftSide>
      </el-aside>

      <el-row class="box-right">
        <el-col :span="4"  class="channel-side" >
            <channelSide/>
        </el-col >
        
        <el-col :span='20'  class="right-main">
           <chatIndex/>
        </el-col>
      </el-row>
    </el-container>

  </div>

</template>

<style lang='scss' scoped>
.el-container{
  height: 100vh;
}


.room{
 height: 100vh;
  
  background-color: #313338;
  .box-right{
    flex:1;
  }
  .aside{
    overflow-x: hidden;
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
}
.el-main{
  padding: 0;
}
</style>
