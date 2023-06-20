<script setup lang='ts'>
import leftSide from "./aside/leftSide.vue"


</script>

<template>
  <div class="chatroom">
    <el-container>
      <el-aside width="72px">
        <leftSide></leftSide>
      </el-aside>

      <el-row class="box-right">
        <el-col :span="4"  class="channel-side" >
          <router-view name="channelSide" />
        </el-col >
        
        <el-col :span='20'  class="right-main">
          <router-view name="mainChannel"></router-view>
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