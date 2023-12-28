<script setup lang='ts'>
import leftSide from "./aside/leftSide.vue"
import { globalStore } from '@/stores/index'
import {useRoute} from 'vue-router'

const route = useRoute()

const store_data = globalStore()



</script>

<template>
  <div class="chatroom">
    <el-container>
      <el-aside width="72px">
        <leftSide :key="route.path"></leftSide>
      </el-aside>

      <el-row class="box-right">
        <el-col :span="4"  class="channel-side" >
            <router-view name="channelSide">
              
            </router-view>
        </el-col >
        
        <el-col :span='20'  class="right-main">
            <router-view name="mainChannel" >

            </router-view>
          
        </el-col>
      </el-row>
    </el-container>

  </div>

</template>

<style lang='scss' scoped>
.el-container{
  height: 100%;
}


.chatroom{
 height: 100%;
  
  background-color: #313338;
  .box-right{
    flex:1;
  }
}
.el-main{
  padding: 0;
}

</style>