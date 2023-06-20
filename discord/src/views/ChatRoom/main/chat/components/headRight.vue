<script setup lang='ts'>
</script>

<template>
  <div class="header-right-icon">
    <el-tooltip
      :hide-after="0"
      :enterable="false"
      class="tip-item"
      effect="dark"
      content="语音通话"
      placement="bottom-end"
    >
      <el-icon :size="24" color="rgb(181, 186, 193)"><Phone /></el-icon>
    </el-tooltip>

    <el-tooltip
      :hide-after="0"
      :enterable="false"
      class="tip-item"
      effect="dark"
      content="视频通话"
      placement="bottom"
    >
      <el-icon :size="24" color="rgb(181, 186, 193)"><VideoCamera /></el-icon>
    </el-tooltip>

    <el-tooltip
      :hide-after="0"
      :enterable="false"
      class="tip-item"
      effect="dark"
      content="添加好友"
      placement="bottom-end"
    >
      <el-icon :size="24" color="rgb(181, 186, 193)"><Star /></el-icon>
    </el-tooltip>
    <div class="search-box">
      <el-input placeholder="搜索" suffix-icon="Search"></el-input>
    </div>

    <el-tooltip
      :hide-after="0"
      :enterable="false"
      class="tip-item"
      effect="dark"
      content="收信箱"
      placement="bottom-end"
    >
      <el-icon :size="24" color="rgb(181, 186, 193)"><Message /></el-icon>
    </el-tooltip>

    <el-tooltip
      :hide-after="0"
      :enterable="false"
      class="tip-item"
      effect="dark"
      content="帮助"
      placement="bottom-end"
    >
      <el-icon :size="24" color="rgb(181, 186, 193)"><QuestionFilled /></el-icon>
    </el-tooltip>
  </div>
</template>

<style lang='scss' scoped>
.header-right-icon{
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}
/* 右上角图标 */
.el-icon{
  padding: 0 6px;
}
</style>