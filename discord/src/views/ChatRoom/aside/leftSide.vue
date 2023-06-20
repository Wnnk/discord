<script setup lang='ts'>
  import {reactive} from "vue"
  import { Download } from '@element-plus/icons-vue';
  const state =  reactive({
    side_message:[{name:"添加服务器",img:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {name:"公开探索服务器",img:new URL('@/assets/images/icn.jpg',import.meta.url).href},]
  })
</script>

<template>
  <el-aside class="aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
    > <!-- 个人私信 -->
      <el-menu-item index="1">
        <!-- 悬停提示 -->
        <el-tooltip
          raw-content
          :hide-after="50"
          class="box-item"
          effect="dark"
          content="私信"
          placement="right"
          :enterable="false"
        >
        <!-- <img src="@/assets/images/icn.jpg"  class="channel-img"/> -->
        
        <el-avatar :src='state.side_message[0].img'  class="channel-img"></el-avatar>
        </el-tooltip>
        <!-- 信息红点 -->
        <el-badge
          :max="99"
          class="item-message"
          value="3"
        >
        </el-badge>
        <!-- 分割线 -->
      </el-menu-item>
      <div class="item-underline">
        <div class="guild-separator"></div>
      </div>
      <!-- 服务器栏 -->
      <el-menu-item v-for="item in state.side_message">
        <el-tooltip
          raw-content
          :content="item.name"
          effect="dark"
          placement="right"
          class="box-item"
          :enterable="false"
        >
          <el-avatar class="channel-img" :size="48" :src="item.img"></el-avatar>
        </el-tooltip>
      </el-menu-item>

      <div class="item-underline">
        <div class="guild-separator"></div>
      </div>
      <!-- 下载App -->
      <el-menu-item index="4">
        <el-tooltip
          raw-content
          content="下载APP"
          effect="dark"
          placement="right"
          class="box-item"
          :enterable="false"
        >
          <el-icon class="download-icon">
            <Download class="icon"/>
          </el-icon>
        </el-tooltip>
      </el-menu-item>


    </el-menu>
  </el-aside>
  





</template>

<style lang="scss" scoped>

.aside{
  width: 72px;
  
}
.el-menu{
  background-color: transparent;
  border-right: none;
  width: 72px;
}

.el-menu-vertical-demo{
  width: 72px;
  .el-menu-item{
    width: 72px;
    display: flex;
    padding: 0 !important;
    align-items: center;
    justify-content: center;
   
    /* 移入变化 */
    &:hover{
      background-color: transparent;
       /* 左侧白条 */
      &::before{
        content: "";
        position: absolute;
        left: 0;
        top:20px;
        bottom: 20px;
        width: 4px;
        background-color: #fff;
        border-radius: 0 4px 4px 0;
        transition:  all 0.3s ease-out;
        opacity: 0.5;
      }
      /* 鼠标移入后图标变化 */
      .channel-img{
        border-radius: 35% !important;
        width: 50px;
        height: 50px;
        transition: all 0.3;
      }
    }
   

  }
  .el-menu-item.is-active::before {
    content: "";
    position: absolute;
    width: 4px;
    left: 0;
    top: 6px !important;
    bottom: 6px !important;
    opacity: 1 !important;
    border-radius: 0 4px 4px 0;
    background-color: #fff;
  }
 
  
  
  .item-underline{
    position: relative;
    margin: 0 0 8px;
    display: flex;
    -webkit-box-pack:center;
    justify-content: center;
    width: 72px;
  }
  /* 分割线 */
  .guild-separator{
    height: 2px;
    width: 32px;
    border-radius: 1px;
    background-color: rgba(78, 80, 88, 0.48);
  }
  /* 左侧栏图标 */
  .channel-img{
    display: block;
    width: 48px;
    height: 48px;
    
  }
  /* tip */
  .el-badge{
    position: absolute;
    margin-left: 35px;
    margin-bottom: 10px;
  }
  /* 除去tip的白色边框 */
  .item-message{
    :deep(.el-badge__content--danger){
      border: none;
    }
  }
  /* 下载icon */
  .download-icon{
    width: 72px;
    .icon{
      width: 48px;
      height: 48px;
      //background-color: #313338 !important;
      border-radius: 50%;
      transition: all 0.3s;
      color: rgb(35, 165, 89);
      &:hover{
        width: 50px;
        height: 50px;
      }
    }
  }

}

</style>
