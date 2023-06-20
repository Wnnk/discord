<script setup lang='ts'>
import headLeft from "./components/headLeft.vue"
import headRight from "./components/headRight.vue"
import chatMain from "./components/chatMain.vue"
import friendInformation from "./components/friendInformation.vue"
</script>

<template>
  <div>
    <el-container>
      <el-header class="header">
        <el-row>
          <el-col :span="15" class="header-left">
            <headLeft />
          </el-col>
          <el-col :span="8" class="header-right">
            <headRight />
          </el-col>
        </el-row>
      </el-header>
      <el-row class="chat-main">
        <el-col :span="17">
          <el-container>
            <chatMain />
          </el-container>
        </el-col>
        <el-col :span="7" class="box-right">
          <el-container>
            <friendInformation/>
          </el-container>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<style lang='scss' scoped>
.el-row{
  justify-content: space-between;
}
.header{
  height: 50px;
}
.chat-main{
  position: relative;
  height: 100vh;
  padding: unset;
  background-color: #313338;
  
}
.el-container{
  height: 100%;
}
</style>