<script setup lang='ts'>
import { defineComponent } from 'vue';
import { globalStore } from '@/stores/index'
import { reactive } from 'vue';
import router from '@/routers';

const method = reactive({
  user_setting() {
    router.push('/setting/account')
  },
  change_mute() {
    state.mute = !state.mute
  },
  change_mute_headphones() {
    state.mute_headphones = !state.mute_headphones
  }
})
const state = reactive({
  mute:true,             //静音
  mute_headphones:false,  //耳机静音
})
const store_data = globalStore()
defineComponent({
  name:"UserInfo"
})
</script>

<template>
    <el-col :span="12" class="bottom-profile-avatar">
      <el-avatar :src="store_data.user_info.avator_url" class="bottom-profile-avatar-img"></el-avatar>
      <span>
        <p>{{store_data.user_info.user_name}}</p>
        <p>{{store_data.user_info.user_name}}</p>
      </span>
    </el-col>

    <el-col :span="12" class="bottom-profile-avatar">
<!--       <el-tooltip 
        :hide-after="50" 
        class="box-item"
        effect="dark" 
        content="取消静音" 
        placement="top"
      >
      <el-icon size="32" color="rgb(181, 186, 193)" v-if="state.mute === true" @click="method.change_mute"><Mute /></el-icon>
      <el-icon  size="32" color="rgb(181, 186, 193)" v-if="state.mute === false" @click="method.change_mute"><Microphone /></el-icon>
      
      </el-tooltip>
      <el-tooltip
        :hide-after="50" 
        class="box-item" 
        effect="dark" 
        content="耳机静音" 
        placement="top"
      >
      <el-icon size="32" color="rgb(181, 186, 193)" v-if="state.mute_headphones === true" @click="method.change_mute_headphones"><Bell /></el-icon>
      <el-icon size="32" color="rgb(181, 186, 193)" v-if="state.mute_headphones === false" @click="method.change_mute_headphones"><MuteNotification /></el-icon>
      </el-tooltip> -->

      <el-tooltip
        :hide-after="50" 
        class="box-item" 
        effect="dark" 
        content="设置" 
        placement="top"
      >
      <el-icon size="32" color="rgb(181, 186, 193)" @click="method.user_setting"><Setting /></el-icon>
      </el-tooltip>
    </el-col>
</template>

<style lang='scss' scoped>

.bottom-profile-avatar{
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 头像与名字 */
  &:first-child{
    justify-content: space-evenly;

    .bottom-profile-avatar-img{
      width: 40px;
      height: 40px;

    }

    &:hover{
        background-color: #3d3e45;
        border-radius: 5px;
        cursor: pointer;
    }
    /* 字体设置 */
    span{
      width: 45px;

      p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:first-child{
          color: #f2f3f5;
          font-weight: bold;
        }
      }
    }

    /* 图标 */
    &:last-child{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-size: 18px;
      color: #b5bac1;
      height: 30px;
      width: 30px;
      &:hover{
        background-color: #35373c;
        border-radius: 5px;
        cursor: pointer;
        color:#dbdee1;
      }
    }

    


  }
}
</style>