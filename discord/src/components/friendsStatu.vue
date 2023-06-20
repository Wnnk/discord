<script setup lang='ts'>
const props = defineProps({
  status:{
    type:String,
    default:"online"
  },
  status_text:{
    type:String,
    default:''
  }
})
</script>

<template>
  <div class="friend-status">
    <div
      v-if="!props.status_text"
      :class="[
        status === 'online' ? 'status-online' 
        : status === 'idle' ? 'status-idle' 
        :status === 'offline' ? 'status-offline' 
        : 'status-busy',
      ]"
    >
    </div>
    <!-- 在线 -->
    <el-tooltip
      :hide-after="50"
      :enterable="false"
      v-else-if="status === 'online'"
      effect="dark"
      :content="props.status_text"
      placement="top"
    >
    <div class="status-online"></div>
    </el-tooltip>
    <!-- 闲置 -->
    <el-tooltip
      :hide-after="50"
      :enterable="false"
      v-else-if="status === 'idle'"
      effect="dark"
      :content="props.status_text"
      placement="top"
    >
    <div class="status-idle"></div>
    </el-tooltip>
    <!-- 离线 -->
    <el-tooltip
      :hide-after="50"
      :enterable="false"
      v-else-if="status === 'offline'"
      effect="dark"
      :content="props.status_text"
      placement="top"
    >
    <div class="status-offline"></div>
    </el-tooltip> 
    <!-- 忙碌 -->
    <el-tooltip
      :hide-after="50"
      :enterable="false"
      v-else-if="status === 'busy'"
      effect="dark"
      :content="props.status_text"
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