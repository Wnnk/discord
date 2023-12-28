<script setup lang='ts'>
const props = defineProps({
  status:{
    type:Number,
    default:1
  },

})
</script>

<template>
  <div class="friend-status">

    <!-- 在线 -->
    <el-tooltip
      :hide-after="50"
      :enterable="false"
      v-if="status === 1"
      effect="dark"
      content="在线"
      placement="top"
    >
    <div class="status-online"></div>
    </el-tooltip>
    <!-- 闲置 -->
    <el-tooltip
      :hide-after="50"
      :enterable="false"
      v-else-if="status === 2"
      effect="dark"
      content="空闲"
      placement="top"
    >
    <div class="status-idle"></div>
    </el-tooltip>
    <!-- 离线 -->
    <el-tooltip
      :hide-after="50"
      :enterable="false"
      v-else-if="status === 0"
      effect="dark"
      content="离线"
      placement="top"
    >
    <div class="status-offline"></div>
    </el-tooltip> 
    <!-- 忙碌 -->
    <el-tooltip
      :hide-after="50"
      :enterable="false"
      v-else-if="status === 3 "
      effect="dark"
      content="忙碌"
      placement="top"
    >
    <div class="status-busy"></div>
    </el-tooltip>   
  </div>
</template>

<style lang='scss' scoped>
.status-online{
  width: 10px;
  height: 10px;
  background-color: #43b581;
  border-radius: 50%;
  border:  2px solid #2f3136;
  /* 伪元素制造空心 */
  &::after{
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background-color: #2f3136;
    border-radius: 50%;
    margin: 2.5px;
  } 
}

.status-idle{
  width: 10px;
  height: 10px;
  background-color: #faa61a;
  border-radius: 50%;
  border: 2px solid #2f3136;
  &::after{
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background-color: #2f3136;
    border-radius: 50%;
    margin: 2.5px;
  }   
}

.status-offline{
  width: 10px;
  height: 10px;
  background-color: #747f8d;
  border-radius: 50%;
  border: 2px solid #2f3136;
  &::after{
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background-color: #2f3136;
    border-radius: 50%;
    margin: 2.5px;
  } 
}

.status-busy{
  width: 10px;
  height: 10px;
  background-color: #f04747;
  border-radius: 50%;
  border: 2px solid #2f3136;
  &::after{
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background-color: #2f3136;
    border-radius: 50%;
    margin: 2.5px;
  } 
}
</style>