<script setup lang='ts'>
import leftSide from "@/views/ChatRoom/aside/leftSide.vue"
import coverySide from "./coverySide.vue";
import discovery from "./discovery.vue";
import {useRoute} from 'vue-router'

const route = useRoute()





</script>

<template>
  <div class="room">
    <el-container>
      <el-aside width="72px">
        <leftSide :key="route.path"></leftSide>
      </el-aside>

      <el-row class="box-right">
        <el-col :span="4"  class="channel-side" >
            <coverySide/>
        </el-col >
        
        <el-col :span='20'  class="right-main">
           <discovery/>
        </el-col>
      </el-row>
    </el-container>

  </div>

</template>

<style lang='scss' scoped>
// .el-container{
//   height: 100%;
// }


.room{
 height: 100%;
  
  background-color: #313338;
  .box-right{
    // flex:1;
  }
}
.el-main{
  padding: 0;
}
</style>
