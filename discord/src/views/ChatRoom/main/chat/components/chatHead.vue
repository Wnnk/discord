<script setup lang='ts'>
import {reactive} from "vue"
import type { information } from "@/stores/interface/information";
import axios from "@/axios";
const state = reactive({
  service:1
})
const props = defineProps<{
  information:information
}>()

const method = reactive({
  relationship(relationship:number) {
    axios('/information/relationship',{
      data:{
        relationship,
        friend_uuid: props.information.uuid
      }
    })
  }
})
</script>

<template>
  <div class="chat-head">
    <div class="chat-top">
      <div class="chat-avatar">
        <el-avatar :size="80" :src="props.information.avator_url"></el-avatar>
      </div>
      <div class="chat-name">
        <span>{{props.information.user_name}}</span>
      </div>
    </div>


    <div class="chat-service">
      <span v-if="state.service === 0">没有共同的服务器频道</span>
      <span v-else>{{state.service}}个共同服务器频道</span>
      </div>
    <div class="chat-edit">
      <el-button size="small" class="chat-operate" @click="method.relationship(0)">删除好友</el-button>
      <el-button size="small" class="chat-operate" @click="method.relationship(-1)">屏蔽好友</el-button>
    </div>
  </div>


</template>

<style lang='scss' scoped>
.chat-head{
  width: 100%;
  overflow: hidden;
  height: 160px;
  background-color: #313338;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 20px;
  border-bottom: 1px solid #4e5058;
}
.chat-top{
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #f2f3f5;
  font-weight: 600;
}
.chat-name{
  margin-left: 15px;
}
.chat-edit{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
}
.chat-operate{
  color: #f2f3f5;
  border-radius: 5px;
  background-color: #4e5058;
  transition: all 0.3s;
  &:hover{
    background-color: #63656d;
  }

  &:active{
    border: none;
  }
}
</style>