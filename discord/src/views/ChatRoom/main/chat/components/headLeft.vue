<script setup lang='ts'>
import friendsStatu from "@/components/friendsStatu.vue"
</script>

<template>
  <div class="header-left-left">
    <el-icon :size="24" color="rgb(97, 97, 97)"><Flag /></el-icon>
    <span>props.name</span>
    <el-tooltip
      :hide-after="0"
      :enterable="false"
      effect="dark"
      content="在线"
      placement="bottom"
    >
      <friendsStatu/>
    </el-tooltip>
  </div>
</template>

<style lang='scss' scoped>
.header-left-left{
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-evenly;
  width: 140px;
  /* 朋友名字span */
  span{
    display: flex;
    align-items: center;
    background-color: #248046;
    color: #fffff3;
    font-size: 16px;
    font-weight: bold;
    padding: 1px;
    &:hover{
    background-color: #2e9a2e;
    }
  }
 
}
</style>