<script setup lang='ts'>
import router from '@/routers'
</script>

<template>
  <div class="notFound">
    <img src="@/assets/images/brand2.png" class="backHome" @click="() =>{ router.push('/')}">
    <img src="@/assets/images/404.png" >
    <div class="tip">
      <h1 class="title">是否找不到方向?</h1>
      <div class="text">陌生人，你看起来很迷茫。你知道，在迷茫的时候，
      什么能帮上忙吗？是一碗热乎乎的面条。
      请坐吧，我们在这里疯狂地工作，为的就是给你准备一些好东西。
      哦，你需要读点什么吗？这些可能会帮助您：
    </div>
    </div>
    
    
  </div>
</template>

<style lang='scss' scoped>
.notFound{
  display: grid;
  height:100vh;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  .backHome{
    width:65px;
    height:34px;
    justify-self: left;
    grid-column: 1;
    padding:20px;
  }
  img{
    grid-column-start: 2;
    grid-column-end:3;
    height:100%;
    justify-self: center;

  }
  .tip{
    grid-column: 2 / 3;
    .title{
      font-size: 44px;
      color: #5865f2;
      font-weight: 800;
    }
    .text{
      margin-top: 20px;
      color: #000;
      line-height:140%;
    }
  }
}
</style>