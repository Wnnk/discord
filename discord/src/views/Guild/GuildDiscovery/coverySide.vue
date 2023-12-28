<script setup lang='ts'>
import {reactive } from "vue"
import userInfo from "@/views/ChatRoom/channelSide/components/userInfo.vue";
const state = reactive({
  init_data:[
    {icon:new URL('@/assets/images/discovery.png',import.meta.url).href,name:'发现'},
    {icon:new URL('@/assets/images/game.png',import.meta.url).href,name:'游戏'},
    {icon:new URL('@/assets/images/music.png',import.meta.url).href,name:'音乐'},
    {icon:new URL('@/assets/images/education.png',import.meta.url).href,name:'教育'},
    {icon:new URL('@/assets/images/science.png',import.meta.url).href,name:'科学&技术'},
    {icon:new URL('@/assets/images/entertainment.png',import.meta.url).href,name:'娱乐'},
  ],
  active_index:0
})
</script>

<template>
  <div class="coveryside">
    <div class="side-title">
      <h2>发现</h2>
    </div>
    <div class="category">
      <div 
        class="category-item" v-for="(item,index) in state.init_data" 
        :key="index" :class="state.active_index === index ? 'active' : '' "
        @click="state.active_index = index"
      >
        <img :src="item.icon" >
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
  <div class="buttom">
    <userInfo/>
  </div>
 
</template>

<style lang='scss' scoped>
.coveryside{
  width: 100%;
}
.side-title{
  h2{
    margin: 16px 0 16px 16px;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: #F2F3F5;
  }
}
.category{
  padding: 5px 8px;
  :hover{
    background-color:  rgb(181, 186, 193,0.2);
    border-radius: 8px;
    /* border: 1px red solid; */
  }

}
.category-item{
  width: 90%;
  padding: 5px 8px;
  height: 42px;
  display: flex;
  align-items: center;

  img{
    width: 32px;
    height: 32px;
    margin: 0 12px 0 0;
  }
  span{
    color: #B5BAC1;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    flex: 0 1 auto; 
    pointer-events: none;
  }
}
.active{
  background-color: #5856F2 !important;
  border-radius: 8px;
}
.buttom{
  width: 240px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
}
</style>