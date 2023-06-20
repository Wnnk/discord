<script setup lang='ts'>
import {reactive} from "vue"
const state = reactive({
  sreach_word:null
})

const method = reactive({
  searchFriend(){
    console.log(`触发搜索:${state.sreach_word}`)
  }
})
</script>

<template>
  <!-- 搜索组件 -->
  <div class="search-box-top">
    <div class="search-box">
      <el-input
        class="search-input"
        v-model="state.sreach_word"
        placeholder="搜索"
        @keyup.enter.native="method.searchFriend"
      >

      </el-input>
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>