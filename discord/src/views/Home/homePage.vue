<script lang="ts" setup>
import topNav from './components/topNav/topNav.vue'
import rightSide from "./components/rightSide/rightSide.vue"
import { reactive } from 'vue';
  const state = reactive({
    right_side_show:true   //侧边栏状态
  })
  const method = reactive({
    change_right_side(){
      state.right_side_show = !state.right_side_show 
    }
  })
</script>


<template>
  <div class="main">
    <!-- 导航栏 -->
    <topNav @change_right_side = method.change_right_side> </topNav>
    <!-- 背景 -->
    <div class="main-background">
      <div class="base-background">
        <img src="@/assets/images/background.svg" alt="">
      </div>
      <div class="left-background">
        <img src="@/assets/images/left.svg" alt="">
      </div>
      <div class="right-background">
        <img src="@/assets/images/right.svg" alt="">
      </div>
    </div>
    <!-- 主要容器 -->
    <div class="container">
      <div class="container-main">
        <div class="container-title">
          <h1 class="h1-welcome">想象这样一个场所......</h1>
          <div class="sub-title">在这里，您可以加入校园俱乐部、游戏群组，或是世界级艺术社区。在这里，您也能邀三五好友一起共度欢乐时光。在这里，您可以轻而易举地每日谈天说地，时常消遣娱乐。</div>
        </div>
        <div class="contatiner-body">
          <button class="button-download button-style">Windows版下载</button>
          <button class="button-open button-style">在您的浏览器中打开 cord</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 右侧栏 -->
  <transition name="right">
    <div>
      <rightSide v-if="state.right_side_show" @change_right_side="method.change_right_side"></rightSide>
    </div>
    
  </transition>
  

  
</template>




<style lang="scss" scoped>
.main{
  background: #404eed;
  position: relative;
  min-height: 626px;
  overflow: hidden;
  display: flex;
  flex-direction:  column;
}
.main-background{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.left-background{
  position: absolute;
  bottom: 0;
  left: 50%;
  display: block;
  height: auto;
  width: auto;
  max-width: none;
  margin-left: -1030px;
  transform: none;
}
.right-background{
  position: absolute;
  display: block;
  bottom: 0;
  left: 50%;
  margin-left: 370px;
}
.container{
  margin: 0 auto;
  width:100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  z-index: 1;
  max-width: 1260px;
  padding: 120px 40px;

}
.container-main{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #fff;
  text-align: center;

}
.container-title{
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.h1-welcome{
  width: 100%;
  font-weight: 800;
  font-size: 56px;
  flex-grow: 1;
}
.sub-title{
  margin-top: 40px;
  flex-grow: 1;
}
.contatiner-body{
  display: flex;
  align-items: center;
  flex-wrap: wrap;

}
.button-style{
  margin-right: 24px;
  margin-top: 24px;
  border-radius: 28px;
  font-size: 20px;
  padding: 16px 32px;
  cursor: pointer;
}
.button-download{
  background-color: #fff;
  color:#23272a;
}
.button-open{
  background-color: #23272a;
  color:#fff;
}

.right-enter-active,.right-leave-active{
  transition: all 10s ;
}
.right-enter, .right-leave-to{
  transform: translateX(100%);
}

@media screen and (min-width:768px)
{
  .main{
    padding-bottom: 56px;
    padding-bottom: var(--section-spacing);
    min-height: 626px;
  }

}

@media screen and (max-width: 768px) {
  
}
</style>