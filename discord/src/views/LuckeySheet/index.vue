<script setup lang='ts'>
import leftSide from "@/views/ChatRoom/aside/leftSide.vue"
import {useRoute} from 'vue-router'
import SheetList from "@/views/LuckeySheet/compoments/SheetList.vue"

const route = useRoute()


</script>

<template>
  <div class="room">
    <el-container>
      <el-aside width="72px">
        <leftSide :key="route.path"></leftSide>
      </el-aside>

      <el-row class="box-right">
        <el-col :span='24'  class="right-main">
           <SheetList/>
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
 min-height: 100vh;
  
  background-color: #313338;
  .box-right{
    flex:1;
  }
}
.el-main{
  padding: 0;
}
</style>





